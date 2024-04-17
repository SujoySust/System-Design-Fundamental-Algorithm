/**
 * Weighted Least Connections
 *
 * The Weighted Least Connections algorithm combines the Least Connections and Weighted Round Robin algorithms.
 * It directs incoming requests to the server with the lowest ratio of active connections to assigned weight.
 *
 * Pros:
 * - Balances load effectively, accounting for both server capacities and active connections.
 * - Adapts to varying server workloads and capacities.
 *
 * Cons:
 * - Requires tracking active connections and maintaining server weights.
 * - May not factor in server response time or health.
 *
 * Example: An e-commerce website uses three servers with different capacities and assigned weights.
 * The load balancer directs new requests to the server with the lowest ratio of active connections to weight,
 * ensuring an efficient distribution of load.
 *
 */

class WeightedLeastConnectionsLoadBalancer {
  private servers: { name: string; weight: number; connections: number }[];
  constructor(servers: { name: string; weight: number }[]) {
    this.servers = servers.map((server) => ({ ...server, connections: 0 }));
  }

  getNextServer(): string {
    if (this.servers.length === 0) {
      throw new Error("No servers available");
    }

    let selectedServer = this.servers[0];
    let minLoad = selectedServer.connections / selectedServer.weight;

    for (let i = 1; i < this.servers.length; i++) {
      const server = this.servers[i];
      const load = server.connections / server.weight;
      if (load < minLoad) {
        selectedServer = server;
        minLoad = load;
      }
    }

    selectedServer.connections++;
    return selectedServer.name;
  }

  releaseConnection(serverName: string) {
    const server = this.servers.find((s) => s.name === serverName);
    if (server) {
      server.connections--;
      if (server.connections < 0) {
        server.connections = 0;
      }
    }
  }
}

{
  {
    const servers = [
      { name: "server1", weight: 3 },
      { name: "server2", weight: 2 },
      { name: "server3", weight: 1 },
    ];

    const loadBalancer = new WeightedLeastConnectionsLoadBalancer(servers);

    for (let i = 0; i < 10; i++) {
      const server = loadBalancer.getNextServer();
      console.log(`Request ${i + 1} routed to ${server}`);
    }

    loadBalancer.releaseConnection("server1");
    loadBalancer.releaseConnection("server2");
    loadBalancer.releaseConnection("server3");
  }
}