
/** @jsx React.DOM */
//var baseurl = "http://apex.zoolalondon.com/zoola/pzdev/"
//**********--- call getCookie function to read cookie---**********
getCookie()


if (getParameterByName("islog") && getParameterByName("islog") == 'true') {
    is_loggedIn = true;
}
else {
    is_loggedIn = false;
}
//**********--- subheader component ---**********
var Subheader = React.createClass({
    render: function () {
        return (
                  <div className="row">
                     <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 no-padding">
                        <h3>Statements</h3>
                    </div>
                 </div>
        )
    }
});

//**********--- pages component ---**********
var Pagination = React.createClass({
    render: function () {
        var self = this;
        return (
                  <ul>
                      {(function (que, num) {
                          //console.log(num)
                          for (i = Math.max(1, self.props.activePage-5) ; i <= Math.min(self.props.activePage+5,num); i++)
                          {
                          que.push(
                                <li id={"pagenation_" + i} key={i} onClick={self.props.self.changepage.bind(null, i)} className={i == self.props.activePage? "active" : '' }>{i}</li>)
                          }
                          return que
                      })([], this.props.totalPages)}

                  </ul>
        )
    }
});

//**********--- statement component ---**********
var Statement = React.createClass({
    getInitialState: function () {
        return {
            transactions: [],
            paymntTransaction: [],
            totalPages: 0,
            itemsPerPage: 0,
            activePage: 0,
            filteredTrans:[]
        };
    },

    componentWillMount: function () {
        var paymntTransaction = {
            "transactions": [{
                "date": "10-May-2016",
                "time": "18:10",
                "detail": "Deposit",
                "amount": "10.00",
                "balance": "12.34"
            }, {
                "date": "11-May-2016",
                "time": "10:55",
                "detail":
                    "Ticket Fee: Chelsea Game",
                "amount": "5.00",
                "balance": "7.34"
            }, {
                "date": "11-May-2016",
                "time": "22:34",
                "detail": "Game Win",
                "amount": "35.00",
                "balance": "42.34"
            }, {
                "date": "12-May-2016",
                "time": "20:12",
                "detail": "Withdraw",
                "amount": "20.00",
                "balance": "22.34"
            }]
        }
        
        this.serverRequest = $.get( baseurl+"history/statement/" + userId + "," + sessionId, function (result) {
            if (typeof result != 'object') {
                result = JSON.parse(result)
            }
            //var tans = result.transactions
            //var tans1 = result.transactions
            this.setState({ transactions: result.transactions });
            var itemPerpage = 15;
            var totPages = Math.ceil(result.transactions.length / itemPerpage);
            var filteredTrans = result.transactions.slice(0, itemPerpage);
            //console.log(filteredTrans)
            this.setState({ totalPages: totPages, itemsPerPage: itemPerpage, activePage: 1, filteredTrans: filteredTrans })
        }.bind(this));
    },
    changepage: function (pno) {
        this.setState({ activePage: pno })
        var startIndex,endIndex;
        if (pno > 1)
        {
            startIndex = (pno-1) * this.state.itemsPerPage;
        }
        else {
            startIndex = 0;
        }
        endIndex = startIndex + this.state.itemsPerPage
        //console.log("startIndex=="+startIndex)
        var filteredTrans = this.state.transactions.slice(startIndex, endIndex);
        //console.log(filteredTrans)
        this.setState({ filteredTrans: filteredTrans })
        //console.log(this.state.transactions)
        //console.log(pno);
    },
    scrollpage : function(){
        $('#pagination-demo').twbsPagination({
            totalPages: 35,
            visiblePages: 7,
            onPageClick: function (event, page) {
                $('#page-content').text('Page ' + page);
            }
        });
    },
       render: function () {
           return (<div>
	            <div className="row no-margin">
                    {
               this.state.filteredTrans.map(function (item, index) {
                   if (index % 2 == 0) {
                       return <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 statement bg-light-blue" key={index}>
				            <div className="col-lg-2 col-md-2 col-sm-2 col-xs-3 text-left no-padding-left">
				                <div className="sm-txt ">Trans ID:{item.tra_id}</div>
                                <div className="tm-txt">{item.date}</div>
					            <div className="sm-txt">{item.time}</div>
				            </div>
				            <div className="col-lg-8 col-md-8 col-sm-8 col-xs-6 text-center">
					            <div className="tm-txt">{item.detail}</div>
				            </div>
				            <div className="col-lg-2 col-md-2 col-sm-2 col-xs-3 text-right no-padding-right">
					           <div className="tm-txt">{item.signamount}{item.currency}{item.amount}</div>
					            <div className="sm-txt">{item.currency}{item.balance}</div>
				            </div>
		            </div>
                   }
                   else {
                       return <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 statement bg-dark-blue"  key={index}>
				                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-3 text-left no-padding-left">
                                     <div className="sm-txt">Trans ID:{item.tra_id}</div>
                                    <div className="tm-txt">{item.date}</div>
					                <div className="sm-txt">{item.time}</div>
				                </div>
				                <div className="col-lg-8 col-md-8 col-sm-8 col-xs-6 text-center">
					                <div className="tm-txt">{item.detail}</div>
				                </div>
				                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-3 text-right no-padding-right">
					            <div className="tm-txt">{item.signamount}{item.currency}{item.amount}</div>
					            <div className="sm-txt">{item.currency}{item.balance}</div>
				                </div>
		                </div>
                   }
               })
		           }

	                </div>

   <div className="row">
		<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
			<div className="statement-navigation">
                     <Pagination totalPages= {this.state.totalPages} self={this} activePage={this.state.activePage}/>
			</div>
		</div>

   </div>

    <div className="space-10"></div>

           
                 </div>
             )
       }

});


