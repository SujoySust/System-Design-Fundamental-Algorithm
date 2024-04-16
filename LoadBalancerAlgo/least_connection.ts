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
