/** @jsx React.DOM */
var amt =0;
//**********--- call getCookie function to read cookie---**********
getCookie()


if (getParameterByName("islog") && getParameterByName("islog") == 'true') {
    is_loggedIn = true;
}
else {
    is_loggedIn = false;
}

//**********--- Subheader component ---**********
var Subheader = React.createClass({
    render: function () {
        return (
                           <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 no-padding">
                                        <h3> Change Avatar</h3>
                                </div>
                           </div>
        )
    }
});

//**********--- Changeavatar component ---**********
var Changeavatar = React.createClass({
    getInitialState: function () {
        return {
            avatars: [],
            favavatar: "",
            avatarsListed:[]
        };
    },
    componentWillMount: function () {
        var Avatars = [
	{
	    "avatar_id": 123,
	},
	{
	    "avatar_id": 2,
	},
	{
	    "avatar_id": 3,
	  
	},
	{
	    "avatar_id": 4,
	  
	},
	{
	    "avatar_id": 5,
	   
	},
	{
	    "avatar_id": 6,
	    
	},
	{
	    "avatar_id": 7,
	   
	},
    {
        "avatar_id": 8,
    },
    {
        "avatar_id": 9,
    },
    {
        "avatar_id": 10,
    },
    {
        "avatar_id": 11,
    },
    {
        "avatar_id": 12,
    },
    {
        "avatar_id": 13,
    },
    {
        "avatar_id": 14,
    },
    {
        "avatar_id": 15,
    },
    {
        "avatar_id": 16,
    },
    {
        "avatar_id": 17,
    },
    {
        "avatar_id": 18,
    },
    {
        "avatar_id": 19,
    },
    {
        "avatar_id": 20,
    },
    {
        "avatar_id": 21,
    },
    {
        "avatar_id": 22,
    },
    {
        "avatar_id": 23,
    },
    {
        "avatar_id": 24,
    },
    {
        "avatar_id": 25,
    },
    {
        "avatar_id": 26,
    },
    {
        "avatar_id": 27,
    },
	{
	    "avatar_id": 28,
	},
    {
	    "avatar_id": 29,
    },
    {
	    "avatar_id": 30,
    },
    {
	    "avatar_id": 31,
    },
    {
	    "avatar_id": 32,
	},
    {
        "avatar_id": 33,
    }, 
    {
        "avatar_id": 34,
    },
    {
        "avatar_id": 35,
    },
    {
        "avatar_id": 36,
    },
    {
        "avatar_id": 37,
    },
    {
        "avatar_id": 38,
    },
    {
        "avatar_id": 39,
    },
    {
        "avatar_id": 40,
    },
    {
        "avatar_id": 41,
    },
    {
        "avatar_id": 42,
    },
    {
        "avatar_id": 43,
    },
    {
        "avatar_id": 44,
    },
    {
        "avatar_id": 45,
    },
    {
        "avatar_id": 46,
    },
    {
        "avatar_id": 47,
    },
    {
        "avatar_id": 48,
    },
    {
        "avatar_id": 49,
    },
    {
        "avatar_id": 50,
    },
    {
        "avatar_id": 51,
    },
    {
        "avatar_id": 52,
    },
    {
        "avatar_id": 53,
    },
    {
        "avatar_id": 54,
    },
    {
        "avatar_id": 55,
    },
        ];
        var totalItems = Avatars.length;
        var itemsPerPage = 30;
        var pages = Math.ceil(totalItems / itemsPerPage);
        var ava = [];
        for (i = 0; i < pages; i++)
        {
            ava.push(Avatars.slice(i * itemsPerPage, (i + 1) * itemsPerPage))
        }
        this.setState({ "avatars": Avatars, "avatarsListed":ava })
    },
    componentDidMount: function (favavatar) {
        this.serverRequest = $.get(baseurl + "registration/image/" + userId + ',' + sessionId, function (result) {
            if (typeof result != 'object') {
                result = JSON.parse(result)
            }
            this.setState({ favavatar: result.image[0], selectedAvatar: result.image[0] })
            $("#avatar_" + this.state.favavatar.usr_image).addClass("selected-avatar")
        }.bind(this));
    },
    selectAvatar: function (id) {
        this.setState({ "selectedAvatar": id });
        $(".thumb").removeClass('selected-avatar');
        $("#avatar_" + id).addClass('selected-avatar');
        
    },
    choose: function () {
        var data1 = {"item":[{"usr_image":this.state.selectedAvatar}]}
        this.serverRequest = $.post(baseurl + "registration/image/" + userId + ',' + sessionId, JSON.stringify(data1), function (result) {
            // window.location = "/build/views/Football/myprofile/myprofile.html?islog=" + is_loggedIn
            window.location = "/myprofile/?islog=" + is_loggedIn
        }.bind(this));
    },   
    render: function () {
        var self = this;
            return ( <div>
            <div className="space-10"></div>
	        <div className="space-10"></div>
            <div className="row">
                <div className="col-lg-8 col-md-8 col-sm-8 col-xs-11 col-centered">
                    <div className="zoola-box col-centered">
                          <div className="change-avatar">
                              <div id="thumbcarousel" className="carousel slide change-avatar-slider" data-interval="false">
                                    <div className="carousel-inner">
                                        {
                                            this.state.avatarsListed.map(function (element,index) {
                                                return <div className={index==0?"item active":'item'} key={index}>
                                                            <div className="row text-center">
                                                                {
                                                                    element.map(function (item, index) {
                                                                        return <div data-target="#carousel" key={index} data-slide-to="0" className="thumb" onClick={self.selectAvatar.bind(null, item.avatar_id)} id={"avatar_" + item.avatar_id }><img src={"/images/animals-Modified/" + item.avatar_id + ".svg"}/></div>
                                                                    })
                                                                }
                                                            </div>
                                                        </div>
                                            })
                                        }                                                                
                                    </div>
                                   <a className="left carousel-control" href="#thumbcarousel" role="button" data-slide="prev">
                                        <i aria-hidden="true" className="fa fa-angle-left font-40 padding-top-10 blue"></i>
                                    </a>
                                    <a className="right carousel-control" href="#thumbcarousel" role="button" data-slide="next">
                                        <i aria-hidden="true" className="fa fa-angle-right font-40 padding-top-10 blue"></i>
                                    </a>
                              </div>
                          </div>
                     
                    </div>
                    <div className="space-10"></div>
                    <div className="col-lg-8 col-md-6 col-sm-6 col-xs-12 col-centered no-padding"> 
                        <button className="btn zoola-btn" onClick={self.choose}><div className="btn-txt">Choose</div></button>
                    </div>
                </div>
             </div>
		     <div className="space-10"></div>
            <div className="space-5"></div>
         </div>
             )
       }

});

