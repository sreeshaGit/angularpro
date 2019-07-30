/** @jsx React.DOM */
var datePic = React.createClass({
    componentDidMount: function () {
        console.log("date pic loaded");
        $('#' + this.props.id).datepicker({
            format: "dd/mm/yyyy"
        });
    },
	
    render: function () {
        return (
          <div className="input-group col-md-12">
                    <input type="text" placeholder="Select date" id={this.props.id} className="form-control col-md-12" />
                    <span className="input-group-addon" id="basic-addon1"><i className="glyphicon glyphicon-calendar"></i></span>
           </div>
        )
    }
});