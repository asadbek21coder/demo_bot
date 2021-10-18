const TelegramBotApi = require('node-telegram-bot-api')
const token = ""
const bot = new TelegramBotApi(token, { polling: true })
const chats = {}
const {gameOptions, againOptions,photoOption} = require('./options.js')



const startGame = async (chatId) => {
    await bot.sendMessage(chatId, ` 0 dan 9 gacha bir raqam o'yladim`)
    const randomNumber = Math.floor(Math.random() * 10)
    chats[chatId] = randomNumber
    console.log(chats[chatId])
    await bot.sendMessage(chatId, `Raqamni toping`, gameOptions)
}
const getPhotoFunc = async (chatId) => {
    await bot.sendMessage(chatId, "Tugmani bosib rasm olishingiz mumkin!", photoOption)
}

const start = () => {
    bot.setMyCommands([
        { command: '/start', description: 'Salomlashish' },
        { command: '/info', description: 'boshlangich malumotlar' },
        { command: '/game', description: `son topish o'yiniz` },
        { command: '/getphoto', description: `get nice photos` }

    ])

    bot.on('message', async message => {
        const chatId = message.chat.id
        const text = message.text
        const name = message.chat.first_name
        
        if (text === '/game') {
            console.log(message.from.first_name + ' ' + 'game')
            return startGame(chatId)
            
        }
        
        if (text == '/start') {
            await console.log(message.from.first_name + ' ' + 'starting')
            await bot.sendSticker(chatId, "https://tlgrm.eu/_/stickers/fc2/01a/fc201aad-5ea0-48fd-b779-f8a237ff21ae/2.webp")

            return bot.sendMessage(chatId, `Assalomu alaykum, ${name}. Botimizga xush kelibsiz.\n /info - ma'lumot olish uchun`)

        }
        if (text == '/info') {
            await console.log(message.from.first_name + ' ' + 'info')
            return bot.sendMessage(chatId, `ushbu bot bilan o'yin o'ynashingiz yoki turli xil rasmlarni olishingiz mumkin. \n /game - o'yin o'ynash \n /getphoto - rasm tomosha qilish`)
        }
        if (text == '/getphoto') {
            await console.log(message.from.first_name + ' ' + 'photo')
            return getPhotoFunc(chatId)
        }


        return bot.sendMessage(chatId, 'Sizni tushunmadim')

    })

    bot.on("callback_query", async msg => {
        const data = msg.data
        const chatId = msg.message.chat.id
        
        if (data == '/again') {
            return startGame(chatId)
        }
        if (data == "rasm olish") {
            index = Math.floor(Math.random() *100)
            return bot.sendPhoto(chatId, `https://picsum.photos/500?random=${index}`, photoOption)
        }
        if (data == chats[chatId]) {
            return bot.sendMessage(chatId, `Barakalla siz to'g'ri topdingiz, men o'ylagan raqam ham ${data}`, againOptions)
        }
        else {
            return bot.sendMessage(chatId, `Afsuski topa olmadingiz men ${chats[chatId]} raqamini o'ylagandim`, againOptions)
        }
    })
}

start()
