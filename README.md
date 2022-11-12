## ThousandEyes Video Endpoint Notification

This macro polls the thousandeyes API and presents current webex quality
based on the mos (mean opinion score) of a G.711 RTP test stream.

Probably not the best test based on cloud video architecture but this is
also the very first version ;-)

### UI
In the screenshot below you can see the message generate by this macro in
the lower left of the screen.  

![user experience screenshot](/quality.png?raw=true "User Experience")

todo:

* Add other meetings services
* suggest rebooking meeting if service is degraded

### Deployment Suggestions

At this time there are is no agent to run on the video endpoints themselves.
Because of this I suggest monitoring the health of meetings services with an
enterprise agent at the same site and ideally the same VLAN as the video endpoint.

When then endpoint polls the ThousandEyes test data point it will be getting details
about a test ran from a similar perspective.

### Caveats

The tested used in development was an RTP Stream test to a cloud agent that lives
in webex data centers.  Other meetings services (MSTF / Zoom) don't have TE enterprise
agents deployed.  Additionally, its worth noting that video endpoints don't connect
directly to the meetings service but first connect to a call control system when
registered to the webex cloud. This means the test path (EN Agent to Webex Cloud Agent)
are not the same.  Major issues with a webex data center will result in issues however
so the test is also not worthless.  I welcome feedback on ways to improve the TE testing
method as well as macro code itself.   
