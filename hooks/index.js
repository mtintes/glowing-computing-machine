

const processEvents =  async(message) => {
    console.log("messages", message)
    const event = JSON.parse(message)
    
    switch (event.event){
        case "connect":
            console.log("processingEvents")
            break;

    } 
}

module.exports = {
    processEvents
}