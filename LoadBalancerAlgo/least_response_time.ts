/**
 * The Least Response Time algorithm directs incoming requests to the server with
 * the lowest response time and the fewest active connections. This method helps to
 * optimize the user experience by prioritizing faster-performing servers.
 *
 * Pros:
 * - Accounts for server response times, improving user experience.
 * - Considers both active connections and response times, providing effective load balancing.
 *
 * Cons:
 * - Requires monitoring and tracking server response times and active connections, adding complexity.
 * - May not factor in server health or varying capacities.
 *
 * Example: A video streaming service uses the Least Response Time algorithm to direct users
 * to the server with the fastest response time, ensuring that videos start quickly
 * and minimize buffering times.
 */

class LeastResponseTimeLoadBalancer {
  private servers: string[];
  private responseTimes: Map<string, number>;

  constructor(servers: string[]) {
    this.servers = servers;
    this.responseTimes = new Map<string, number>();

    // Initialize response times for each server to 0
    servers.forEach((server) => {
      this.responseTimes.set(server, 0);
    });
  }

  updateResponseTime(server: string, responseTime: number) {
    this.responseTimes.set(server, responseTime);
  }

  getNextServer(): string {
    if (this.servers.length == 0) {
      throw new Error("No servers available.");
    }
    let minResponseTime = Number.MAX_SAFE_INTEGER;
    let selectedServer = "";

    this.servers.forEach((server) => {
      const responseTime = this.responseTimes.get(server) || 0;
      if (responseTime < minResponseTime) {
        minResponseTime = responseTime;
        selectedServer = server;
      }
    });

    return selectedServer;
  }
}

{
  {
    const servers = ["server1", "server2", "server3"];
    const loadBalancer = new LeastResponseTimeLoadBalancer(servers);

    loadBalancer.updateResponseTime("server1", 20);
    loadBalancer.updateResponseTime("server2", 15);
    loadBalancer.updateResponseTime("server3", 30);

    for (let i = 0; i < 10; i++) {
      const server = loadBalancer.getNextServer();
      console.log(`Request ${i + 1} routed to ${server}`);
    }
  }
}
