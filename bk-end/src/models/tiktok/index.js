
const ProxyAgent = require('proxy-agent')

const { io } = require('../socket');
const { TikTokConnectionWrapper, getGlobalConnectionCount } = require('./connectionWrapper');
const { clientBlocked } = require('./limiter');


const socketIotiktoklive = io;


const Model = require('../db/tiktok');



let UserModel = Model.ModelUserSchema;
let ChannelModel = Model.ModelChannelSchema;
let CommentModel = Model.ModelCommentSchema;
let LiveIdModel = Model.ModelLiveIdSchema;
let LikeModel = Model.ModelLikeSchema;
let GiftModel = Model.ModelGiftSchema;

const connectTiktok = (socket) => {
    console.info('TikTok Live Socket Started');
    let tiktokConnectionWrapper;

    // console.info('New connection from origin', socket.handshake.headers['origin'] || socket.handshake.headers['referer']);
    //lay danh sach 100 ng dung
    //lay danh sach message
    socket.on('setUniqueId', async (uniqueId, options) => {
     
        //save chanel
        let channelModel = await ChannelModel.findOne({uniqueId: uniqueId}).exec()

        // Prohibit the client from specifying these options (for security reasons)
        if (typeof options === 'object') {
            delete options.requestOptions;
            delete options.websocketOptions;
        }

        // Is the client already connected to a stream? => Disconnect
        if (tiktokConnectionWrapper) {
            tiktokConnectionWrapper.disconnect();
        }

        // Check if rate limit exceeded
        if (process.env.ENABLE_RATE_LIMIT && clientBlocked(io, socket)) {
            socket.emit('tiktokDisconnected', 'You have opened too many connections or made too many connection requests. Please reduce the number of connections/requests or host your own server instance. The connections are limited to avoid that the server IP gets blocked by TokTok.');
            return;
        }

        // Connect to the given username (uniqueId)
        try {
            // options = {
            //     requestOptions: {
            //         httpsAgent: new ProxyAgent('socks://115.74.0.160:42697'),
            //         timeout: 5000 // 10 seconds
            //     },
            //     websocketOptions: {
            //         agent: new ProxyAgent('socks://115.74.0.160:42697'),
            //         timeout: 5000 // 10 seconds
            //     }
            // };
            console.log(options)
            console.info('Connecting to TikTok username:', uniqueId);
            tiktokConnectionWrapper = new TikTokConnectionWrapper(
                uniqueId,
                options,
                true
            );
            tiktokConnectionWrapper.connect();
            // tiktokConnectionWrapper.getState





        } catch (err) {
            socket.emit('tiktokDisconnected', err.toString());
        
            return;
        }
        // socket.emit('tiktokDisconnected','ddijt');
       
        // Redirect wrapper control events once
        let LIVECHATID = await new Promise((resolve, reject) => {
            
            tiktokConnectionWrapper.once('connected', async state => {
                // console.log(state)
                if(channelModel === null) {
                    //create
                    channelModel = await new ChannelModel({
                        channelId : state.roomInfo.owner.id_str,
                        uniqueId : uniqueId,
                        liveChatCount : 1,
                        owner : {
                            cover : null ? state.roomInfo.owner.avatar_large.url_list.length : state.roomInfo.owner.avatar_large.url_list[0],
                            username: uniqueId,
                            nickname : state.roomInfo.owner.nickname,
                            bio_description : state.roomInfo.owner.bio_description,
                            follow_info : {
                                follower_count : state.roomInfo.owner.follow_info.follower_count,
                                following_count : state.roomInfo.owner.follow_info.following_count,
                            }
                        }
                        
                        
                        
 
                    }).save()
                }
                liveIdModel_ = await LiveIdModel.findOne({liveId: state.roomId})
                .exec()
   
                if(liveIdModel_ === null) {
                    //create
                    liveIdModel_ = await new LiveIdModel({
                        liveId: state.roomId,
                        channelId: state.roomInfo.owner.id_str,
                        title: state.roomInfo.title,
                        timestamp : {
                            start : state.roomInfo.create_time
                        }
                    }).save()
                }else if (state.roomId != liveIdModel_.liveId){
                    ChannelModel.findOne({_id: channelModel._id}).exec().then( result => {
                        result.liveChatCount++;
                        result.owner.nickname = state.roomInfo.owner.nickname;
                        result.owner.bio_description = state.roomInfo.owner.bio_description,
                        result.owner.follow_info = {
                            follower_count : state.roomInfo.owner.follow_info.follower_count,
                            following_count : state.roomInfo.owner.follow_info.following_count,
                        }
                        result.save();
                    });
                }




   








                resolve(liveIdModel_)
                socket.emit('tiktokConnected', {
                    liveId: state.roomId,
                    roomInfo : {
                        title: state.roomInfo.title,
                        cover : null ? state.roomInfo.cover.url_list.length : state.roomInfo.cover.url_list[0],
                    }

                })
            });
        })




        tiktokConnectionWrapper.connection.on('er', reason => socket.emit('tiktokDisconnected', reason));

        tiktokConnectionWrapper.connection.on('disconnected', reason => socket.emit('tiktokDisconnected', reason));
    
        // Notify client when stream ends
        tiktokConnectionWrapper.connection.on('streamEnd', () => socket.emit('streamEnd'));

        // Redirect message events
        tiktokConnectionWrapper.connection.on('roomUser', msg => socket.emit('roomUser', msg));
        
        let USERID = await new Promise(async (resolve, reject) => {
            await tiktokConnectionWrapper.connection.on('member', async msg => {
                userModel = await UserModel.findOne({userId: msg.userId})
                    .exec()
                if(userModel === null) {
                    //create
                    userModel = await new UserModel({
                        userId: msg.userId,
                        liveId: LIVECHATID._id,
                        uniqueId: msg.uniqueId,
                        nickname: msg.nickname,
                        image: msg.profilePictureUrl,
                        /*
                        followRole: 1,
                        userBadges: [],
                        isModerator: false,
                        isNewGifter: false,
                        isSubscriber: false,
                        topGifterRank: null,
                        displayType: 'live_room_enter_toast',
                        label: '{0:user} joined'
                        */
                    }).save()
                }
   
                socket.emit('member', msg)
                resolve(userModel)
            })
        });
        tiktokConnectionWrapper.connection.on('chat', async msg => {
            // console.log(msg)
            //create
            await new CommentModel({
                userId: USERID._id,
                comment: msg.comment,
                channelId: channelModel.channelId,

    
            }).save()
         
                //cộng comment vào user
            UserModel.findOne({_id: USERID._id}).exec().then( result => {
                result.commentCount++;
                result.save();
            });
            socket.emit('chat', msg)
        });
        tiktokConnectionWrapper.connection.on('gift', async msg => {
            await new GiftModel({
                userId: USERID._id,
            })
            /**
                giftId: 5655,
                repeatCount: 1,
                userId: '7025547515073512449',
                uniqueId: 'anhs576',
                nickname: 'あらやまはた',
                profilePictureUrl: 'https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/56af45ee6bb967facb3f17b8fae8dc24~c5_100x100.jpeg?x-expires=1657026000&x-signature=t6nbkI%2BYi9euRjZJGY3KwJ4Ci3Y%3D',
                followRole: 0,
                userBadges: [],
                repeatEnd: false,
                gift: { gift_id: 5655, repeat_count: 1, repeat_end: 0, gift_type: 1 },
                describe: 'Sent Rose',
                giftType: 1,
                diamondCount: 1,
                giftName: 'Rose',
                giftPictureUrl: 'https://p19-webcast.tiktokcdn.com/img/maliva/webcast-va/eba3a9bb85c33e017f3648eaf88d7189~tplv-obj.png',
                timestamp: 1656854591126,
                receiverUserId: '6868539471827403778',
                
             */
            //console.log('gift', msg);
            socket.emit('gift', msg)
        });
        tiktokConnectionWrapper.connection.on('social', async msg => {
            //followed the host
            //console.log('social', msg);
            socket.emit('social', msg)
        });
        tiktokConnectionWrapper.connection.on('like', async msg => {
            await new LikeModel({
                userId: USERID._id,
                likeCount: msg.likeCount,
                totalLikeCount: msg.totalLikeCount,
            //   followRole: 1,
            //   userBadges: [],
            //   isModerator: false,
            //   isNewGifter: false,
            //   isSubscriber: false,
            //   topGifterRank: null,
            //   displayType: 'pm_mt_msg_viewer',
            //   label: '{0:user} sent likes to the host'

            })
            //console.log('like', msg);
            socket.emit('like', msg)
        });
        tiktokConnectionWrapper.connection.on('er', (msg) => {
            console.log(msg);
        })
        tiktokConnectionWrapper.connection.on('questionNew', msg => socket.emit('questionNew', msg));
        tiktokConnectionWrapper.connection.on('linkMicBattle', msg => socket.emit('linkMicBattle', msg));
        tiktokConnectionWrapper.connection.on('linkMicArmies', msg => socket.emit('linkMicArmies', msg));
        tiktokConnectionWrapper.connection.on('liveIntro', msg => socket.emit('liveIntro', msg));
        tiktokConnectionWrapper.connection.on('emote', msg => socket.emit('emote', msg));
        tiktokConnectionWrapper.connection.on('envelope', msg => socket.emit('envelope', msg));
    });

    socket.on('disconnect', () => {
        if (tiktokConnectionWrapper) {
            tiktokConnectionWrapper.disconnect();
        }
    });

    socket.on('getAvailableGifts', () => {
        if (tiktokConnectionWrapper){
            tiktokConnectionWrapper.connection.getAvailableGifts().then(giftList => {
                socket.emit('AvailableGifts',giftList);
    
            }).catch(err => {
                socket.emit('error', err);
            }
            )
        }
        console.log('getAvailableGifts');

    })






}




// Emit global connection statistics
setInterval(() => {
    socketIotiktoklive.emit('statistic', { globalConnectionCount: getGlobalConnectionCount() });
}, 5000)





module.exports = connectTiktok