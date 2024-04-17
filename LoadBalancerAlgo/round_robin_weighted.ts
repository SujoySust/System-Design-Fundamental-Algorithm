/**
 * The Weighted Round Robin algorithm is an extension of the Round Robin algorithm 
 * that assigns different weights to servers based on their capacities. 
 * The load balancer distributes requests proportionally to these weights.
 * 
 * Pros:
 * - Accounts for different server capacities, balancing load more effectively.
 * - Simple to understand and implement.
 * 
 * Cons: 
 * - Weights must be assigned and maintained manually.
 * - No consideration for server health or response time.
 * 
 * Example: A content delivery network has three servers with varying capacities.
 * The load balancer assigns weights of 3, 2, and 1 to these servers, respectively, distributing requests in a 3:2:1 ratio.
 */

class WeightedRoundRobinLoadBalancer {
    private servers: {name: string, weight: number}[];
    private currentIndex: number;
    private currentWeight: number;
    private maxWeight: number;
    private gcd: number;

    constructor(servers: {name: string, weight: number}[]) {
        this.servers = servers;
        this.currentIndex = 1;
        this.currentWeight = 0;
        this.maxWeight = this.getMaxWeight();
        this.gcd = this.calculateGCD();
    }

    private getMaxWeight(): number {
        return Math.max(...this.servers.map(server => server.weight));
    }

    private calculateGCD(): number {
        const weights = this.servers.map(server => server.weight);
        const gcd = (a: number, b: number): number => {
            while(b) {
                const temp = b;
                b = a % b;
                a = temp;
            }
            return a;
        }
        return weights.reduce(gcd);
    }

    getNextServer(): string {
        while (true) {
            this.currentIndex = (this.currentIndex + 1) % this.servers.length;
            if (this.currentIndex == 0) {
                this.currentWeight -= this.gcd;
                if (this.currentWeight <= 0) {
                    this.currentWeight = this.maxWeight;
                    if (this.currentWeight === 0) {
                        return "";
                    }
                }
            }
    
            if (this.servers[this.currentIndex].weight >= this.currentWeight) {
                return this.servers[this.currentIndex].name;
            }
        }
    }
}

{{
    const servers = [
        { name: "server1", weight: 3 },
        { name: "server2", weight: 2 },
        { name: "server3", weight: 1 }
    ];

    const loadBalancer = new WeightedRoundRobinLoadBalancer(servers);

    for (let i = 0; i < 10; i++) {
        const server = loadBalancer.getNextServer();
        console.log(`Request ${i + 1} routed to ${server}`);
    }
}}