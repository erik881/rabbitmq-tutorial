const amqp = require('amqplib/callback_api');

const args = process.argv.slice(2);
const msg = args.slice(1).join(' ') || 'Hello World!';
const severity = (args.length > 0) ? args[0] : 'info';


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

        ch.assertExchange('direct_logs', 'direct', { durable: false });
        ch.publish('direct_logs', severity, Buffer.from(msg));
        console.log(" [x] Sent %s: '%s'", severity, msg);
        setTimeout(function() {
            conn.close();
            process.exit(0)
        }, 500);
    });
});