const amqp = require('amqplib/callback_api');

const msg = process.argv.slice(2).join(' ') || 'Hello World!';
const q = 'task_queue';

amqp.connect('amqp://user:password@192.168.99.100', function(err, conn) {
    if (err) {
        console.error('Unable to connect', err);
        process.exit(-1);
    }

    conn.createChannel(function(err, ch) {
        if (err) {
            console.error('Unable to create channel', err);
            process.exit(-1);
        }

        ch.assertExchange('logs', 'fanout', { durable: false });
        ch.publish('logs', '', Buffer.from(msg));
        console.log(" [x] Sent '%s'", msg);
        setTimeout(function() {
            conn.close();
            process.exit(0)
        }, 500);
    });
});