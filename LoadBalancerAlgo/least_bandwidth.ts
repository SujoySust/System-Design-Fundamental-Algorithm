/**
 * The Least Bandwidth algorithm directs incoming requests to the server currently utilizing
 * the least amount of bandwidth. This approach helps to ensure that servers are not overwhelmed
 * by network traffic.
 *
 * Pros:
 * - Considers network bandwidth usage, which can be helpful in managing network resources.
 * - Can provide effective load balancing when servers have varying bandwidth capacities.
 *
 * Cons:
 * - Requires monitoring and tracking server bandwidth usage, adding complexity.
 * - May not factor in server health, response times, or active connections.
 *
 * Example: A file hosting service uses the Least Bandwidth algorithm to direct users
 * to the server with the lowest bandwidth usage, ensuring that servers with high traffic
 * are not overwhelmed and that file downloads are fast and reliable.
 */

class LeastBandwidthLoadBalancer {
  private servers: { name: string; bandwidth: number }[];

  constructor(servers: { name: string; bandwidth: number }[]) {
    this.servers = servers;
  }

  getNextServer(): string {
    if (this.servers.length === 0) {
      throw new Error("No servers available.");
    }

    let leastBandwidthServer = this.servers[0];

    for (let i = 1; i < this.servers.length; i++) {
      if (this.servers[i].bandwidth < leastBandwidthServer.bandwidth) {
        leastBandwidthServer = this.servers[i];
      }
    }
    return leastBandwidthServer.name;
  }
}

{
  {
    const servers = [
      { name: "server1", bandwidth: 100 },
      { name: "server2", bandwidth: 200 },
      { name: "server3", bandwidth: 150 },
    ];
    const loadBalancer = new LeastBandwidthLoadBalancer(servers);

    // Simulate requests being distributed among servers
    for (let i = 0; i < 10; i++) {
      const server = loadBalancer.getNextServer();
      console.log(`Request ${i + 1} routed to ${server}`);
    }
  }
}
