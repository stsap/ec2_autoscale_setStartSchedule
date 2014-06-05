var aws = require("aws-sdk");
var creds = require("./credentials.json");
if (process.env.AWS_ACCESS_KEY) {
	aws.config.update({
		accessKeyId: process.env.AWS_ACCESS_KEY,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
		region: process.env.AWS_REGION
	});
} else {
	aws.config.loadFromPath("credentials.json");
}

var params = {
	AutoScalingGroupName: process.env.AWS_AUTOSCALING_GROUP_NAME || creds.AutoScalingGroupName,
	ScheduledActionName: process.env.AWS_AUTOSCALING_SCHEDULED_ACTION_NAME || creds.ScheduledActionName,
	Recurrence: process.env.AWS_AUTOSCALING_RECURRENCE || creds.Recurrence,
	MinSize: 1,
	MaxSize: 1,
	DesiredCapacity: 1
};
new aws.AutoScaling().
	putScheduledUpdateGroupAction(params).
	on("success", function () { console.log(arguments); }).
	on("error", function () { console.log(arguments); }).
	send();
