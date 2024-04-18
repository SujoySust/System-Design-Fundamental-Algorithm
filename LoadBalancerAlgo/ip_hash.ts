/**
 * The IP Hash algorithm determines the server to which a request should be sent based 
 * on the source and/or destination IP address. This method maintains session persistence,
 * ensuring that requests from a specific user are directed to the same server.
 * 
 * Pros:
 * - Maintains session persistence, which can be useful for applications requiring 
 *   a continuous connection with a specific server.
 * - Can distribute load evenly when using a well-designed hash function.
 * 
 * Cons:
 * - May not balance load effectively when dealing with a small number of clients with many requests.
 * - No consideration for server health, response time, or varying capacities.
 * 
 * Example: An online multiplayer game uses the IP Hash algorithm to ensure that all requests
 * from a specific player are directed to the same server, maintaining a continuous connection
 * for a smooth gaming experience.
 * 
 */

class IPHashLoadBalancer {
    private servers: string[];

    constructor(servers: string[]) {
        this.servers = servers;
    }

    hashIp(ipAddress: string): number {
        let hash = 0;
        for (let i = 0; i < ipAddress.length; i++) {
            const char = ipAddress.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash &= hash;
        }

        return Math.abs(hash) % this.servers.length;
    }

    getNextServer(ipAddress: string) {
        const hash = this.hashIp(ipAddress); 
        return this.servers[hash];
    }
}

{{
    const servers = ["server1", "server2", "server3"];
    const loadBalancer = new IPHashLoadBalancer(servers);
    const ipAddresses = ["192.168.1.1", "10.0.0.1", "172.16.0.1", "192.168.1.1", "10.0.0.1", "172.16.0.1",];

    ipAddresses.forEach((ip, index)=> {
        const server = loadBalancer.getNextServer(ip);
        console.log(`Request ${index + 1} from ${ip} routed to ${server}`);
    })
}}