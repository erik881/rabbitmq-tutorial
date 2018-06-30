const amqp = require('amqplib/callback_api');

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

        const q = 'task_queue';

        ch.assertQueue(q, { durable: true });
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
        ch.prefetch(1);
        ch.consume(q, function(msg) {
            const secs = msg.content.toString().split('.').length - 1;
            console.log(" [x] Received %s", msg.content.toString());
            setTimeout(function() {
                console.log(" [x] Done");
                ch.ack(msg);
            }, secs * 1000);
        }, {noAck: false});
    });
});