import React from 'react';
import PropTypes from 'prop-types';

import { VegaChart, getVegaTheme } from 'widget-editor';

// /widget_data.json?widget_id=
class WidgetBlock extends React.Component {
  constructor(props) {
    super(props);
    this.widgetConfig = null;
    this.state = {
      loading: true,
      widget: null
    };
  }
  componentWillMount() {
    const { item } = this.props;
    this.getChart(item.content.widgetId);
  }
  getChart(widgetId) {
    fetch(`${window.location.origin}/widget_data.json?widget_id=${widgetId}`).then((res) => {
      return res.json();
    }).then((widget) => {
      this.setState({
        loading: false,
        widget
      });
    });
  }
  render() {
    if (this.state.loading) { return null; }
    return (
      <VegaChart
        data={this.state.widget.visualization}
        theme={getVegaTheme()}
        reloadOnResize
      />
    );
  }
}

WidgetBlock.propTypes = {
  item: PropTypes.object.isRequired
};

export default WidgetBlock;
