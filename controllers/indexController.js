const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const os = require('os');
const process = require('process');

exports.homepage = catchAsyncErrors (async (req, res, next) => {
   
        res.json({ message: "homepage" })
   
});

exports.healthCheck = catchAsyncErrors (async (req, res, next) => {
    res.status(200).json({
        status: "healthy",
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

exports.metrics = catchAsyncErrors (async (req, res, next) => {
    const memoryUsage = process.memoryUsage();
    const cpuUsage = process.cpuUsage();
    
    const metrics = {
        timestamp: new Date().toISOString(),
        system: {
            hostname: os.hostname(),
            platform: os.platform(),
            arch: os.arch(),
            uptime: os.uptime(),
            loadavg: os.loadavg(),
            totalmem: os.totalmem(),
            freemem: os.freemem(),
            cpus: os.cpus().length
        },
        process: {
            pid: process.pid,
            uptime: process.uptime(),
            memory: {
                rss: memoryUsage.rss,
                heapTotal: memoryUsage.heapTotal,
                heapUsed: memoryUsage.heapUsed,
                external: memoryUsage.external
            },
            cpu: {
                user: cpuUsage.user,
                system: cpuUsage.system
            },
            versions: process.versions,
            node_env: process.env.NODE_ENV || 'development'
        },
        network: {
            interfaces: os.networkInterfaces()
        }
    };
    
    res.status(200).json(metrics);
});

exports.promtailMetrics = catchAsyncErrors (async (req, res, next) => {
    const logFormat = {
        timestamp: new Date().toISOString(),
        level: "info",
        message: "server_metrics",
        labels: {
            job: "nodejs_api",
            instance: os.hostname(),
            service: "api"
        },
        values: {
            memory_rss: process.memoryUsage().rss,
            memory_heap_used: process.memoryUsage().heapUsed,
            memory_heap_total: process.memoryUsage().heapTotal,
            cpu_user: process.cpuUsage().user,
            cpu_system: process.cpuUsage().system,
            uptime: process.uptime(),
            load_avg_1m: os.loadavg()[0],
            load_avg_5m: os.loadavg()[1],
            load_avg_15m: os.loadavg()[2],
            free_memory: os.freemem(),
            total_memory: os.totalmem()
        }
    };
    
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json([logFormat]);
});
