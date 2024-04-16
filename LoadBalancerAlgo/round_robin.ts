class RoundRobinLoadBalancer {
    private servers: string[];
    private currentIndex: number;

    constructor(servers: string[]) {
        this.servers = servers;
        this.currentIndex = 0;
    }

    getNextServer(): string {
        if(this.servers.length === 0) {
            throw new Error("No servers available!");
        }

        const nextServer = this.servers[this.currentIndex];
        this.currentIndex = (this.currentIndex + 1) % this.servers.length;
        return nextServer;
    }
}

{{
    const servers = ["server1", "server2", "server3"];
    const loadBalancer = new RoundRobinLoadBalancer(servers);

    for( let i = 0; i < 10; i++) {
        const server = loadBalancer.getNextServer();
        console.log(`Request ${i+1} routed to ${server}`)
    }

}}