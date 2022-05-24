const io = require('socket.io-client')

const socket = io("/mediasoup")

socket.on('connection-success', ({ socketId }) => {
  console.log(socketId)
})

let device 

let params = {
    //mediasoup params
}

const streamSuccess = async (stream) => {
    localVideo.srcObject = stream
    const track = stream.getVideoTrack()[0]
    params = {
        track, 
        ...params
    }
}

const getLocalStream = () => {
    navigator.getUserMedia({
        audio: false,
        video: {
            width: {
                min: 640,
                max: 1920,
            }, height: {
                min: 400,
                max: 1080,
            }
        },
    }, streamSuccess, error => {
        console.log(error.message)
    })
}

const createDevice = async () => {
    try {
        device = new mediasoupClient.Device()

        await device.load({
            routerRtpCapabilities: rtpCapabilities
        })

        console.log('RTP Capabilities', rtpCapabilities)

    } catch (error) {
        console.log(error)
        if (error.name === 'UnsupportedError')
            console.warn('browser note supported')
    }
}

btnLocalVideo.addEventListener('click', getLocalStream)