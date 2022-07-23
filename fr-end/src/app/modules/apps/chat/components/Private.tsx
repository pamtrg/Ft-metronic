/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useEffect, useState, useRef, useContext } from 'react'
import { KTSVG, toAbsoluteUrl, defaultAlerts } from '../../../../../_metronic/helpers'
import clsx from 'clsx'
import {
    ListsWidget2,
    StatisticsWidget5,
    StatisticsWidget6,
    MixedWidget1,
    StatisticsWidget4,

} from '../../../../../_metronic/partials/widgets'
import { TestEmission, setUniqueIdio } from '../../../../socket/emits'

import { socket } from "../../../../socket/InitSockets";
type Props = {
    isDrawer?: boolean
}


const UseuniqueId = () => {
    const [uniqueId, setUniqueId] = useState<string>('')

    return [
        {
            uniqueId, setUniqueId
        },
    ];
}


export interface MessageModel {
    uniqueId: string
    userId: string
    comment: string
    nickname: string
    profilePictureUrl: string
}
export interface UserJoinModel {
    nickname: string
    profilePictureUrl: string
    uniqueId: string
    userId: string

}

export interface StreaknModel {
    giftType: number
    repeatEnd: number


}

export interface ScoreModel {
    Rose: number
    Tiktok: number
    FingerHeart: number
    Perfume: number
    Love: number
    Panda: number
    Submarine: number
    JetPlane: number
    Yacht: number
    Interstellar: number
    SunsetSpeed: number
    CastleFantasy: number
    GoldenSportscar: number
    Lion: number
    TikTokUniverse: number


}


export interface GiftModel {
    name: string
    total: number
    monney: number


}

interface Dictionary<T> {
    [key: string]: T;
}




const GiftData: Array<GiftModel> = [
    
    {
        name: 'Rose',
        total: 0,
        monney: 0,
    },
    {
        name: 'Rose',
        total: 0,
        monney: 0
    },
    {
        name: 'Rose',
        total: 0,
        monney: 0
    },
    {
        name: 'Rose',
        total: 0,
        monney: 0
    },
    {
        name: 'Rose',
        total: 0,
        monney: 0
    },
    {
        name: 'Rose',
        total: 0,
        monney: 0
    },
    {
        name: 'Rose',
        total: 0,
        monney: 0
    }
]










const Private: FC<Props> = ({ isDrawer = false }) => {
    const [{ uniqueId, setUniqueId }] = UseuniqueId()



    const [messages, setMessages] = useState<MessageModel[]>([])
    const [userJoins, setUserjoins] = useState<UserJoinModel[]>([])
    const [countViewer, setCountViewer] = useState(0)
    const [countLike, setCountLike] = useState(0)
    const [countSocial, setCountSocial] = useState(0)
    const [countBalance, setBalance] = useState(0)
    const [countGif, setCountGif] = useState(0)
    const [listGift, setGifts] = useState<GiftModel[]>(GiftData)
    const refToElement = useRef<HTMLDivElement>(null);
    


    useEffect(() => {
        // 👇️ scroll to bottom every time messages change
        refToElement.current?.scrollIntoView({ behavior: 'smooth' });

    }, [messages]);


    const sendUniqueId = (uniqueId: string) => {
        setUniqueIdio(uniqueId,{})
    
        setMessages([])
        setUserjoins([])
    }
    

    useEffect(() => {



        socket.on('chat', (message) => {




            setMessages([
                ...messages,
                message
            ]);
        });
        socket.on('member', (member) => {


            setUserjoins([
                ...userJoins,
                member
            ]);



        });

        socket.on('roomUser', (data) => {
            setCountViewer(data.viewerCount)


        });
        socket.on('like', (data) => {
            setCountLike(data.totalLikeCount)


        });
        socket.on('social', (data) => {
            setCountSocial(countSocial + 1)


        });
        socket.on('gift', (data) => {
            // console.log(data)
            setCountGif(countGif + data.repeatCount)
            // if (data.giftType === 1 && !data.repeatEnd) {
            //     // Streak in progress => show only temporary
            //     setCountGif(data.repeatCount + data.giftName * data.repeatCount)
            //     console.log(`${data.uniqueId} is sending gift ${data.giftName} x${data.repeatCount}`);
            // } else {
            //     // Streak ended or non-streakable gift => process the gift with final repeat_count
            //     console.log(`${data.uniqueId} has sent gift ${data.giftName} x${data.repeatCount}`);
            // }

        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket, messages, userJoins, countViewer, countLike, countSocial, countGif]);















    return (
        <>
            <div className='row g-5 g-xl-8'>
                <div className='col-xl-3'>
                    <StatisticsWidget5
                        className='card-xl-stretch mb-xl-8'
                        svgIcon='/media/icons/duotune/general/gen032.svg'
                        color='info'
                        iconColor='primary'
                        title={`Viewers : ${countViewer}`}
                        description=''
                    />
                </div>

                <div className='col-xl-3'>
                    <StatisticsWidget5
                        className='card-xl-stretch mb-xl-8'
                        svgIcon='/media/icons/duotune/ecommerce/ecm008.svg'
                        color='info'
                        iconColor='primary'
                        title={`Shares : ${countSocial}`}
                        description=''
                    />
                </div>

                <div className='col-xl-3'>
                    <StatisticsWidget5
                        className='card-xl-stretch mb-xl-8'
                        svgIcon='/media/icons/duotune/finance/fin006.svg'
                        color='info'
                        iconColor='primary'
                        title={`Gift : ${countGif}`}
                        description=''
                    />
                </div>

                <div className='col-xl-3'>
                    <StatisticsWidget5
                        className='card-xl-stretch mb-5 mb-xl-8'
                        svgIcon='/media/icons/duotune/graphs/gra007.svg'
                        color='info'
                        iconColor='primary'
                        title={`Likes : ${countLike}`}
                        description=''
                    />
                </div>
            </div>
            <div className='row g-5 g-xl-8'>
                <div className='col-xl-4'>
                    <div className='card card-xl-stretch mb-xl-8'>
                        <div className='card-header pt-7' id='kt_chat_contacts_header'>
                            <form className='w-100 position-relative' autoComplete='off'>
                                <KTSVG
                                    path='/media/icons/duotune/general/gen021.svg'
                                    className='svg-icon-2 svg-icon-lg-1 svg-icon-gray-500 position-absolute top-50 ms-5 translate-middle-y'
                                />

                                <input
                                    type='text'
                                    className='form-control form-control-solid px-15'
                                    name='search'
                                    value={uniqueId}
                                    placeholder='Search by username or email...'
                                    onChange={(e) => setUniqueId(e.target.value)}

                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            sendUniqueId(uniqueId)


                                            e.preventDefault()
                                        }
                                    }}
                                />
                            </form>
                        </div>

                        <div className='card-body pt-5' id='kt_chat_contacts_body'>
                            <div
                                className='scroll-y me-n5 pe-5 h-300px h-lg-auto'
                                data-kt-scroll='true'
                                data-kt-scroll-activate='{default: false, lg: true}'
                                data-kt-scroll-max-height='auto'
                                data-kt-scroll-dependencies='#kt_header, #kt_toolbar, #kt_footer, #kt_chat_contacts_header'
                                data-kt-scroll-wrappers='#kt_content, #kt_chat_contacts_body'
                                data-kt-scroll-offset='0px'
                            >
                                {userJoins.map((user, index) => (
                                    <div key={`log${index}`} className='d-flex flex-stack py-4'>
                                        <div className='d-flex align-items-center'>
                                            <div className='symbol symbol-45px symbol-circle'>

                                                <img alt='Pic' src={user.profilePictureUrl} />

                                            </div>

                                            <div className='ms-5'>
                                                <a href='#' className='fs-5 fw-bolder text-gray-900 text-hover-primary mb-2'>
                                                    {user.nickname}
                                                </a>
                                                <div className='fw-bold text-gray-400'>{user.uniqueId}</div>
                                            </div>
                                        </div>

                                        <div className='separator separator-dashed d-none'></div>
                                    </div>

                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className='col-xl-4'>
                    <div className='card card-xl-stretch mb-xl-8' id='kt_chat_messenger'>
                        <div className='card-header' id='kt_chat_messenger_header'>
                            <div className='card-title'>
                                <div className='symbol-group symbol-hover'></div>
                                <div className='d-flex justify-content-center flex-column me-3'>
                                    <a
                                        href='#'
                                        className='fs-4 fw-bolder text-gray-900 text-hover-primary me-1 mb-2 lh-1'
                                    >
                                        Comments : {messages.length}
                                    </a>


                                </div>
                            </div>


                        </div>
                        <div
                            className='card-body'
                            id={isDrawer ? 'kt_drawer_chat_messenger_body' : 'kt_chat_messenger_body'}
                        >
                            <div
                                className='scroll-y me-n5 pe-5 h-300px h-lg-auto'
                                data-kt-element='messages'
                                data-kt-scroll='true'

                                data-kt-scroll-activate='{default: false, lg: true}'
                                data-kt-scroll-max-height='auto'
                                data-kt-scroll-dependencies={
                                    isDrawer
                                        ? '#kt_drawer_chat_messenger_header, #kt_drawer_chat_messenger_footer'
                                        : '#kt_header, #kt_toolbar, #kt_footer, #kt_chat_messenger_header, #kt_chat_messenger_footer'
                                }
                                data-kt-scroll-wrappers={
                                    isDrawer ? '#kt_drawer_chat_messenger_body' : '#kt_content, #kt_chat_messenger_body'
                                }
                                data-kt-scroll-offset={isDrawer ? '0px' : '-2px'}
                            // ref={refToElement}

                            >
                                {messages.map((message, index) => {
                                    // console.log(message)


                                    const contentClass = `${isDrawer ? '' : 'd-flex'} justify-content-start mb-10`
                                    return (
                                        <div
                                            key={`message${index}`}
                                            className={clsx('d-flex', contentClass, 'mb-10',)}

                                        >
                                            <div
                                                className={clsx(
                                                    'd-flex flex-column align-items',
                                                    `align-items-start`
                                                )}
                                            >
                                                <div className='d-flex align-items-center mb-2'>

                                                    <>
                                                        <div className='symbol  symbol-35px symbol-circle '>
                                                            <img alt='Logo' src={message.profilePictureUrl} />
                                                        </div>
                                                        <div className='ms-3'>
                                                            <a
                                                                href='#'
                                                                className='fs-5 fw-bolder text-gray-900 text-hover-primary me-1'
                                                            >
                                                                {message.uniqueId}
                                                            </a>
                                                            <span className='text-muted fs-7 mb-1'>{message.nickname}</span>
                                                        </div>
                                                    </>

                                                </div>

                                                <div
                                                    className={clsx(
                                                        'p-5 rounded',
                                                        `bg-light-info`,
                                                        'text-dark fw-bold mw-lg-400px',
                                                        `text-start`
                                                    )}
                                                    data-kt-element='message-text'
                                                    dangerouslySetInnerHTML={{ __html: message.comment }}
                                                ></div>
                                            </div>
                                        </div>
                                    )
                                })}
                                {/* <div ref={refToElement} /> */}
                            </div>


                        </div>
                    </div>
                </div>
                <div className="col-xl-4">


                    <div className={`card card-xl-stretch mb-xl-8`}>
                        {/* begin::Body */}
                        <div className='card-body p-0'>
                            {/* begin::Header */}
                            <div className={`px-9 pt-7 card-rounded h-275px w-100 bg-primary`}>
                                {/* begin::Heading */}
                                <div className='d-flex flex-stack'>
                                    <h3 className='m-0 text-white fw-bold fs-3'>Sales Summary</h3>

                                </div>
                                {/* end::Heading */}
                                {/* begin::Balance */}
                                <div className='d-flex text-center flex-column text-white'>
                                    <span className='fw-semobold fs-7'>You Balance</span>
                                    <span className='fw-bold fs-2x pt-1'>{`$ ${countGif} `}</span>
                                </div>
                                {/* end::Balance */}
                            </div>
                            {/* end::Header */}
                            {/* begin::Items */}
                            <div
                                className='shadow-xs card-rounded mx-9 mb-9 px-6 py-9 position-relative z-index-1 bg-body'
                                style={{ marginTop: '-100px' }}
                            >
                                                            <div
                                className='scroll-y me-n5 pe-5 h-300px'
                                data-kt-scroll='true'
                                data-kt-scroll-activate='{default: false, lg: true}'
                                data-kt-scroll-max-height='auto'
                                data-kt-scroll-dependencies='#kt_header, #kt_toolbar, #kt_footer, #kt_chat_contacts_header'
                                data-kt-scroll-wrappers='#kt_content, #kt_chat_contacts_body'
                                data-kt-scroll-offset='0px'
                            >
                                {
                                    listGift.map((gift, index) => {
                                        return (
                                            <div className='d-flex align-items-center mb-6'>
                                                {/* begin::Symbol */}
                                                <div className='symbol symbol-45px w-40px me-5'>
                                                    <span className='symbol-label bg-lighten'>
                                                        <KTSVG path='/media/icons/duotune/maps/map004.svg' className='svg-icon-1' />
                                                    </span>
                                                </div>

                                                <div className='d-flex align-items-center flex-wrap w-100'>

                                                    <div className='mb-1 pe-3 flex-grow-1'>
                                                        <div className='fs-5 text-white text-hover-primary fw-bold'>
                                                            {gift.name}
                                                        </div>
                                                        <div className='text-gray-800 fw-semobold fs-7'>{gift.total}</div>
                                                    </div>

                                                    <div className='d-flex align-items-center'>
                                                        <div className='fw-bold fs-5 text-gray-800 pe-1'>{gift.total}</div>
                                                        <KTSVG
                                                            path='/media/icons/duotune/arrows/arr066.svg'
                                                            className='svg-icon-5 svg-icon-success ms-1'
                                                        />
                                                    </div>

                                                </div>

                                            </div>
                                        )



                                    })
                                }
                                </div>


                            </div>
                            {/* end::Items */}
                        </div>
                        {/* end::Body */}
                    </div>


                </div>




            </div>


        </>




    )
}

export { Private }
