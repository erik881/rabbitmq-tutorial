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

        const q = 'hello';

        ch.assertQueue(q, { durable: false });
        ch.sendToQueue(q, Buffer.from('Hello World!'));
        console.log(" [x] Sent 'Hello World!'");
        setTimeout(function() {
            conn.close();
            process.exit(0)
        }, 500);
    });
});