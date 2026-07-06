const dns2 = require('dns2')


const {Packet} = dns2;

const server = dns2.createServer({
    udp: true,
    handle: async (request, send, rinfo) => {
        const response = Packet.createResponseFromRequest(request);
        const [question] = request.questions;
        const domain = question.name.toLowerCase();
        try{
            const client = new dns2({ nameServers: ['1.1.1.1']})
            const result = await client.resolve(domain, 'A')
            console.log('Upstream result:', JSON.stringify(result.answers))
            response.answers = result.answers
            console.log(`${rinfo.address}:${rinfo.port} => ${domain}`)
            console.log(`Question Type: ${question.type}`)
        }catch(err){
            console.error('Error processing request: ', err.message)
        }
        send(response)
    }

})

server.on('listening', (addresses) => {
    const address = addresses.udp || server.addresses().udp;
    console.log(`DNS Server listening on ${address.address}:${address.port}`)
})

server.on('error', (err) => {
    console.error(`DNS Server error:\n${err.stack}`);
    server.close()
})

function createDNSServer() {
    server.listen({ udp: 5333 })
}

module.exports = { createDNSServer };