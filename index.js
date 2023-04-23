const app = require("./app");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
const db = require("./config/database");
const cluster = require("cluster");
const os = require("os");
const { QueryTypes } = require("sequelize");

const cpus = os.cpus;
const numCPUs = cpus().length; // Getting the No. of CPUs
console.log('No.of CPUs', numCPUs);

const start = () => {
  try {
    const server = app.listen(process.env.PORT, () => {
      console.log(`Server is working for worker ${process.pid} -----> on http://localhost:${process.env.PORT}`);
      // console.log(`Worker ${process.pid} started`);
    });
    process.on("SIGTERM", shutDown);
    process.on("SIGINT", shutDown);

    let connections = [];
    server.on("connection", (connection) => {
      connections.push(connection);
      connection.on(
        "close",
        () => (connections = connections.filter((curr) => curr !== connection))
      );
    });

    function shutDown() {
      console.log("Received kill signal, shutting down gracefully");
      server.close(() => {
        console.log("Closed out remaining connections");
        process.exit(0);
      });

      setTimeout(() => {
        console.error(
          "Could not close connections in time, forcefully shutting down"
        );
        process.exit(1);
      }, 10000);

      connections.forEach((curr) => curr.end());
      setTimeout(() => connections.forEach((curr) => curr.destroy()), 5000);
    }
  } catch (err) {
    console.log("closed the server");
    process.exit(1);
  }
};

console.log("Process Start", new Date().getTime());
if (numCPUs > 1) {
   if (cluster.isPrimary) {
      console.log(`Primary -----> ${process.pid} is running`);
      console.log(`Forking for -----> ${numCPUs} CPUs`);
      // Fork workers.
      for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
      }
      // When Worker process has died, Log the worker
      cluster.on("exit", function (worker, code, signal) {
         // console.log("Worker", worker.id, "has exited with signal", signal);
         if (code !== 0 && !worker.exitedAfterDisconnect) {
            cluster.fork();
         }
      });
   } else {
      start();
   }
} else {
  start(); 
}
console.log("Process End", new Date().getTime());

// For Syntax and UncaughtException Error
process.on("uncaughtException", (err) => {
  console.log(`Uncaught Exception: ${err.message}`);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.log("Unhandled rejection at ", promise, `reason: ${reason.message}`);
  process.exit(1);
});

process.nextTick(() => {
  console.log(`Running at next tick => worker ${process.pid}`);
});
