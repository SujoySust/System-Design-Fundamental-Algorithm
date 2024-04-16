/**
 * Least Connections Algorithm
 * 
 * The Least Connections algorithm directs incoming requests to the server with 
 * the lowest number of active connections. This approach accounts for the varying 
 * workloads of servers.
 * 
 * Pros:
 * - Adapts to differing server capacities and workloads.
 * - Balances load more effectively when dealing with requests that take a variable amount of time to process.
 * 
 * Cons:
 * - Requires tracking the number of active connections for each server, 
 *   which can increase complexity.
 * - May not factor in server response time or health.
 * 
 * Example: An email service receives requests from users. The load balancer directs 
 *  new requests to the server with the fewest active connections, 
 *  ensuring that servers with heavier workloads are not overwhelmed.
 * 
 */

class LeastConnectionLoadBalancer {
    private servers: {name: string, connections: number}[]
    constructor(servers: string[]) {
        this.servers = servers.map((server)=> ({name: server, connections: 0}));
    }

    getNextServer(): string {
        if (this.servers.length === 0) {
            throw new Error("No servers available!");
        }

        let leastConnectionServer = this.servers[0];

        for (let i = 1; i < this.servers.length ; i ++) {
            if (this.servers[i].connections < leastConnectionServer.connections) {
                leastConnectionServer = this.servers[i];
            }
        }

        leastConnectionServer.connections ++;
        return leastConnectionServer.name;
    }

    releaseConnection(serverName: string) {
        const server = this.servers.find((server)=> server.name == serverName);
        if (server) {
            server.connections --;
            if (server.connections < 0) {
                server.connections = 0;
            }
        }
    }
}

{{
    const servers = ["server1", "server2", "server3"];
    const loadBalancer = new LeastConnectionLoadBalancer(servers);

    for (let i =0; i< 10; i++) {
        const server = loadBalancer.getNextServer();
        console.log(`Request ${i + 1} routed to ${server}`);
    }
    
    loadBalancer.releaseConnection("server1");
    loadBalancer.releaseConnection("server2");
    loadBalancer.releaseConnection("server3");
}}
