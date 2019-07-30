var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var queryString = require('querystring');
http.createServer(function (request, response) {
    var filePath = '.' + request.url.split("?")[0];
   // var queryParams = request.url.split("?")[1];
   
    if (filePath == './')
        filePath = './build/views/Football/GameSelection/gameSelection.html';
	else if (filePath == './index')
        filePath = './build/views/Football/Index/index.html';
    else if (filePath == './fixtureselection')
        filePath = './build/views/Football/FixtureSelection/fixtureSelection.html';
    else if (filePath == './gameselection') 
        filePath = './build/views/Football/GameSelection/gameSelection.html';
    else if (filePath == './leaderboard')
        filePath = './build/views/Football/LeaderBoard/leaderBoard.html';
    else if (filePath == './signup')
        filePath = './build/views/Football/Signup/signup.html';
    else if (filePath == './login')
        filePath = './build/views/Football/Login/login.html';
    else if (filePath == './wallet')
        filePath = './build/views/Football/wallet/wallet.html';
    else if (filePath == './passwordrecovery')
        filePath = './build/views/Football/passwordrecovery/passwordrecovery.html';
    else if (filePath == './dashboard')
        filePath = './build/views/Football/Dashboard/dashboard.html';
    else if (filePath == './notificationPreferences')
        filePath = './build/views/Football/Notification/notificationPreferences/notificationPreferences.html';
    else if (filePath == './notifications')
        filePath = './build/views/Football/Notification/notifications/notifications.html';
    else if (filePath == './transactioncomplete')
        filePath = './build/views/Football/transactioncomplete/transaction-complete.html';
    else if (filePath == './joingame')
        filePath = './build/views/Football/Glory/joinGame/join-game.html';
    else if (filePath == './joinedSetupProfile')
        filePath = './build/views/Football/Glory/joinedSetupProfile/joinedSetupProfile.html';
    else if (filePath == './completemembership')
        filePath = './build/views/Football/Glory/completemembership/completemembership.html';
    else if (filePath == './thankyou')
        filePath = './build/views/Football/Glory/thankyou/thankyou.html';
    else if (filePath == './paynow')
        filePath = './build/views/Football/Glory/paynow/paynow.html';
    else if (filePath == './invites')
        filePath = './build/views/Football/Glory/invites/invites-sent.html';
    else if (filePath == './quicktopup')
        filePath = './build/views/Football/QuickTopUp/Quick-Top-Up.html';
    else if (filePath == './accountProfile')
        filePath = './build/views/Football/Glory/accountProfile/accountProfile.html';
    else if (filePath == './addcard')
        filePath = './build/views/Football/addcard/addcard.html';
    else if (filePath == './createnewgame')
        filePath = './build/views/Football/Createnewgame/createnewgame.html';
    else if (filePath == './statement')
        filePath = './build/views/Football/Statement/statement.html';
    else if (filePath == './creategameqns')
        filePath = './build/views/Football/creategameqns/creategameqns.html';
    else if (filePath == './gamecreated')
        filePath = './build/views/Football/Gamecreated/Gamecreated.html';
    else if (filePath == './creategame')
        filePath = './build/views/Football/Creategame/Creategame.html';
    else if (filePath == './withdrawcard')
        filePath = './build/views/Football/withdraw_card/withdraw_card.html';
    else if (filePath == './withdrawsuccess')
        filePath = './build/views/Football/withdraw_success/withdraw_success.html';
    else if (filePath == './withdraw')
        filePath = './build/views/Football/withdraw/withdraw.html';
    else if (filePath == './contactinfo')
        filePath = './build/views/Football/contact_info/contact_info.html';
    else if (filePath == './changeteam')
        filePath = './build/views/Football/ChangeTeam/change-team.html';
    else if (filePath == './removecard')
        filePath = './build/views/Football/removecard/removecard.html';
    else if (filePath == './myprofile')
        filePath = './build/views/Football/myprofile/myprofile.html';
    else if (filePath == './changeavatar')
        filePath = './build/views/Football/changeAvatar/changeAvatar.html';
    else if (filePath == './changepassword')
        filePath = './build/views/Football/changepassword/changepassword.html'; 
    else if (filePath == './compliancedepositlimit')
        filePath = './build/views/Football/compliance_deposit_limit/compliance-deposit-limit.html';
    else if (filePath == './complianceDepositLimitTimeOut')
        filePath = './build/views/Football/complianceDepositLimitTimeOut/complianceDepositLimitTimeOut.html';
    else if (filePath == './complianceSelfExclusion')
        filePath = './build/views/Football/complianceSelfExclusion/complianceSelfExclusion.html';
    else if (filePath == './topup')
        filePath = './build/views/Football/Glory/topUp/topUp.html';
    else if (filePath == './teamstats')
        filePath = './build/views/Football/teamstats/teamstats.html';
    else if (filePath == './calendar')
        filePath = './build/views/Football/calendar/calendar.html';
    else if (filePath == './Matchstats')
        filePath = './build/views/Football/Matchstats/Matchstats.html';
    else if (filePath == './ResponsibleGamble')
        filePath = './build/views/Football/ResponsibleGamble/ResponsibleGamble.html';
    else if (filePath == './invitemates')
        filePath = './build/views/Football/Glory/invitemates/invitemates.html';
    var extname = path.extname(filePath);
    var contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.jsx':
            contentType = 'text/jsx';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.wav':
            contentType = 'audio/wav';
            break;
        case '.svg':
            contentType = 'image/svg+xml';
            break;
    }
    fs.readFile(filePath, function (error, content) {
       
        if (error) {
            console.log(error)
            if (error.code == 'ENOENT') {
                fs.readFile('./404.html', function (error, content) {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
                response.end();
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });

}).listen(8000);
console.log('Server running at http://127.0.0.1:8000/');