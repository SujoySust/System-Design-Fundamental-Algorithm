/**
 * The Random algorithm directs incoming requests to a randomly selected server from the available pool.
 * This method can be useful when all servers have similar capacities and no session persistence is required.
 *
 * Pros:
 * - Simple to implement and understand.
 * - Can provide effective load distribution when servers have similar capacities.
 *
 * Cons:
 * - No consideration for server health, response times, or varying capacities.
 * - May not be suitable for applications requiring session persistence.
 * - Security systems that rely on detecting anomalies or implementing rate limiting
 *   (e.g., to mitigate DDoS attacks) might find it slightly more challenging to identify
 *   malicious patterns if a Random algorithm is used, due to the inherent unpredictability
 *   in request distribution. This could potentially dilute the visibility of attack patterns.
 *
 * Example: A static content delivery network uses the Random algorithm to distribute requests for images,
 * JavaScript files, and CSS stylesheets among multiple servers. This ensures an even distribution of load
 * and reduces the chances of overloading any single server.
 */

class RandomLoadBalancer {
  private servers: string[];

  constructor(servers: string[]) {
    this.servers = servers;
  }

  getRandomServer(): string {
    if (this.servers.length == 0) {
      throw new Error("No servers available.");
    }

    const randomIndex = Math.floor(Math.random() * this.servers.length);
    return this.servers[randomIndex];
  }
}

{
  {
    const servers = ["server1", "server2", "server3"];
    const loadBalancer = new RandomLoadBalancer(servers);

    // Simulate routing requests randomly
    for (let i = 0; i < 10; i++) {
      const server = loadBalancer.getRandomServer();
      console.log(`Request ${i + 1} routed to ${server}`);
    }
  }
}
