const amqp = require('amqplib/callback_api');

const severities = process.argv.slice(2);

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

        const q = '';

        ch.assertQueue(q, { exclusive: true });

        severities.forEach((severity) => {
            ch.bindQueue(q.queue, 'direct_logs', severity);
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
        ch.consume(q, function(msg) {
            console.log(" [x] %s: '%s'", msg.fields.routingKey, msg.content.toString());
        }, {noAck: true});
    });
});