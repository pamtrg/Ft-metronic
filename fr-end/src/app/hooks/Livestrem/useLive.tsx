



import React, { useState, useEffect, useRef } from "react";


export interface MessageModel {
    uniqueId: string
    userId: string
    comment: string
    nickname: string
    avatar: string
}





const defaultMessages: Array<MessageModel> = [
    {
        uniqueId: '',
        userId: '',
        comment: 'sssssssss',
        nickname: 'lllllllllllll',
        avatar: '',

    }

]











// const bufferMessages = defaultMessages
// function useMessage(){
//     const [chatUpdateFlag, toggleChatUpdateFlat] = useState<boolean>(false)
//     const [messageIn, setMessage] = useState<string>('')
//     const [messages, setMessages] = useState<MessageModel[]>(bufferMessages)
//     const sendMessage = () => {
//         const newMessage: MessageModel = {
//           user: 2,
//           type: 'out',
//           text: messageIn,
//           time: 'Just now',
//         }

//         bufferMessages.push(newMessage)
//         setMessages(bufferMessages)
//         toggleChatUpdateFlat(!chatUpdateFlag)
//         setMessage('')

//       }

//     return {messageIn,setMessage,messages, setMessages, sendMessage};
// }


// export default useMessage;







const UseuniqueId = () => {
    const [uniqueId, setUniqueId] = useState<string>('')

    return [
        {
            uniqueId, setUniqueId
        },
    ];
}

const bufferMessages = defaultMessages

const useMessage = () => {

    const [messages, setMessages] = useState<MessageModel[]>(bufferMessages)


    return [
        {
            messages, setMessages
        }
    ];
    


};

const defaultUserInfos: Array<UserInfoModel> = [
    {
        name: 'Emma Smith',
        avatar: 'avatars/300-6.jpg',
        email: 'e.smith@kpmg.com.au',
        position: 'Art Director',
        online: false,
    },
    {
        name: 'Melody Macy',
        initials: { label: 'M', state: 'danger' },
        email: 'melody@altbox.com',
        position: 'Marketing Analytic',
        online: true,
    },
    {
        name: 'Max Smith',
        avatar: 'avatars/300-1.jpg',
        email: 'max@kt.com',
        position: 'Software Enginer',
        online: false,
    },
    {
        name: 'Sean Bean',
        avatar: 'avatars/300-5.jpg',
        email: 'sean@dellito.com',
        position: 'Web Developer',
        online: false,
    },
    {
        name: 'Brian Cox',
        avatar: 'avatars/300-25.jpg',
        email: 'brian@exchange.com',
        position: 'UI/UX Designer',
        online: false,
    },
    {
        name: 'Mikaela Collins',
        initials: { label: 'M', state: 'warning' },
        email: 'mikaela@pexcom.com',
        position: 'Head Of Marketing',
        online: true,
    },
    {
        name: 'Francis Mitcham',
        avatar: 'avatars/300-9.jpg',
        email: 'f.mitcham@kpmg.com.au',
        position: 'Software Arcitect',
        online: false,
    },

    {
        name: 'Olivia Wild',
        initials: { label: 'O', state: 'danger' },
        email: 'olivia@corpmail.com',
        position: 'System Admin',
        online: true,
    },
    {
        name: 'Neil Owen',
        initials: { label: 'N', state: 'primary' },
        email: 'owen.neil@gmail.com',
        position: 'Account Manager',
        online: true,
    },
    {
        name: 'Dan Wilson',
        avatar: 'avatars/300-23.jpg',
        email: 'dam@consilting.com',
        position: 'Web Desinger',
        online: false,
    },
    {
        name: 'Emma Bold',
        initials: { label: 'E', state: 'danger' },
        email: 'emma@intenso.com',
        position: 'Corporate Finance',
        online: true,
    },
    {
        name: 'Ana Crown',
        avatar: 'avatars/300-12.jpg',
        email: 'ana.cf@limtel.com',
        position: 'Customer Relationship',
        online: false,
    },
    {
        name: 'Robert Doe',
        initials: { label: 'A', state: 'info' },
        email: 'robert@benko.com',
        position: 'Marketing Executive',
        online: true,
    },
    {
        name: 'John Miller',
        avatar: 'avatars/300-13.jpg',
        email: 'miller@mapple.com',
        position: 'Project Manager',
        online: false,
    },
    {
        name: 'Lucy Kunic',
        initials: { label: 'L', state: 'success' },
        email: 'lucy.m@fentech.com',
        position: 'SEO Master',
        online: true,
    },
    {
        name: 'Ethan Wilder',
        avatar: 'avatars/300-21.jpg',
        email: 'ethan@loop.com.au',
        position: 'Accountant',
        online: true,
    },
]


export interface UserInfoModel {
    initials?: { label: string; state: 'warning' | 'danger' | 'primary' | 'success' | 'info' }
    name: string
    avatar?: string
    email: string
    position: string
    online: boolean
}










const useJoinLive = () => {

    const [isJoin, setIsJoin] = useState<UserInfoModel[]>()
    const [userInfos] = useState<UserInfoModel[]>(defaultUserInfos)
    const [userInfo, setUserInfo] = useState<UserInfoModel>()


    return [{ isJoin, setIsJoin, userInfos, setUserInfo, userInfo }]
}















export { useMessage, useJoinLive, UseuniqueId };