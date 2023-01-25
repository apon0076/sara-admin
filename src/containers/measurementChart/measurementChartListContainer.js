import React, { Component } from "react";
import MeasurementChartList from "../../components/measurementChart/MeasurementChartList";
////////////////bellow libary used for Redux implementation purpose/////////////////
import { connect } from "react-redux";
import * as measurementChartAction from "../../store/actions/measurementChartAction";
////////////////END/////////////////

class measurementChartListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchId: "",
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = async (e) => {
    const { target } = e;

    switch (target.name) {
      case "searchId":
        this.setState({ searchId: target.value });
        let searchBy = target.value;
        if (searchBy === "") {
          await this.props.getMeasurementChartRecord();
        } else {
          await this.props.getMeasurementChartByIdRecord(searchBy);
        }
        break;

      default:
    }
  };

  componentDidMount = async () => {
    await this.props.getMeasurementChartRecord();
  };

  deleteMeasurementChart = async (id) => {
    await this.props.deleteMeasurementChartRecord(id);
    this.props.getMeasurementChartRecord();
  };

  render() {
    return (
      <MeasurementChartList
        key="MeasurementChartList"
        {...this.state}
        measurements={this.props.measurements}
        loading={this.props.loading}
        error={this.props.error}
        handleChange={this.handleChange}
        values={this.values}
        searchId={this.props.searchId}
        deleteMeasurementChart={this.deleteMeasurementChart}
      />
    );
  }
}

// Making available in  props
const mapStateToProps = (state) => ({
  data: state.measurementChartReducer.data,
  measurements: state.measurementChartReducer.measurements,
  loading: state.measurementChartReducer.loading,
  error: state.measurementChartReducer.error,
  searchId: state.searchId,
  handleChange: state.handleChange,
  deleteMeasurementChart: state.deleteMeasurementChart,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getMeasurementChartRecord: () =>
      dispatch(measurementChartAction.getMeasurementChartRecord()),
    getMeasurementChartByIdRecord: (index) =>
      dispatch(measurementChartAction.getMeasurementChartByIdRecord(index)),
    deleteMeasurementChartRecord: (data) =>
      dispatch(measurementChartAction.deleteMeasurementChartRecord(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(measurementChartListContainer);
