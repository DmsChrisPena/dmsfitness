const sendEmail = (username) => {
	var nodemailer = require('nodemailer');

	// create reusable transporter object using the default SMTP transport
	var transporter = nodemailer.createTransport('smtps://chris@effortless-solutions.com:1Q0p2w9o!@smtp.gmail.com');

	// setup e-mail data with unicode symbols
	var mailOptions = {
	    from: '"Chris Pena" <chris@effortless-solutions.com>', // sender address
	    to: 'cpena@dmshouston.com', // list of receivers
	    subject: 'Dms Fitness', // Subject line
	    html: `${username} just finished there form. go check it out.` // html body
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        return console.log(error);
	    }
	    console.log('Message sent: ' + info.response);
	});
};

export default sendEmail;