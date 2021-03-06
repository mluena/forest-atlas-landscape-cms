import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Utils
import { getDbContent } from 'utils';

// Components
import Wysiwyg from 'components/shared/Wysiwyg';
import { CoverPage, WysiwygEditor, Footer } from 'components';


const StaticPage = ({ site, version }) => (
  <div className="fa-page">
    <CoverPage site={site} secondary />
    {version <= 1 && <WysiwygEditor content={getDbContent(site.page.content)} />}
    {version > 1 && (
      <div className="vizz-wysiwyg">
        <Wysiwyg
          readOnly
          items={JSON.parse(site.page.content) || []}
        />
      </div>
    )}

    <Footer site={site} />
  </div>
);

function mapStateToProps(state) {
  return { site: state.site };
}

StaticPage.propTypes = {
  version: PropTypes.number.isRequired,
  site: PropTypes.object.isRequired
};

export default connect(mapStateToProps, null)(StaticPage);
