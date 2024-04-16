/**
 * Round Robin Algorithmn
 * 
 * This algorithm distributes incoming requests to servers in a cyclic order.
 * It assigns a request to the first server, then moves to the second, third,
 * and so on, and after reaching the last server, it starts again at the first.
 * 
 * Pros:
 * - Ensures an equal distribution of requests among the servers, 
 *   as each server gets a turn in a fixed order.
 * - Easy to implement and understand.
 * - Works well when servers have similar capacities.
 * 
 * Cons:
 * - May not perform optimally when servers have different capacities or varying workloads.
 * - No consideration for server health or response time.
 * - Round Robin is predictable in its request distribution pattern,
 *   which could potentially be exploited by attackers who can observe 
 *   traffic patterns and might find vulnerabilities in specific servers by
 *   predicting which server will handle their requests.
 * - Example: A website with three web servers receives requests 
 * in the order A, B, C, A, B, C, and so on, distributing the load evenly among the servers.

 */

class RoundRobinLoadBalancer {
  private servers: string[];
  private currentIndex: number;

  constructor(servers: string[]) {
    this.servers = servers;
    this.currentIndex = 0;
  }

  getNextServer(): string {
    if (this.servers.length === 0) {
      throw new Error("No servers available!");
    }

    const nextServer = this.servers[this.currentIndex];
    this.currentIndex = (this.currentIndex + 1) % this.servers.length;
    return nextServer;
  }
}

{
  {
    const servers = ["server1", "server2", "server3"];
    const loadBalancer = new RoundRobinLoadBalancer(servers);

    for (let i = 0; i < 10; i++) {
      const server = loadBalancer.getNextServer();
      console.log(`Request ${i + 1} routed to ${server}`);
    }
  }
}
