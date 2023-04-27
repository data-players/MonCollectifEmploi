import { connect } from 'react-redux';
import Page from '../components/Page';
import { getResourceFromSlug } from '../selectors/urls';
import { loadData, openContactForm } from '../actions';

// state
const mapStateToProps = (state, ownProps) => {
  const { slug } = ownProps.match.params;
  console.log('slug',slug)
  console.log('state.resourceValues',state.resourceValues);
  const page = state.loading.pages
    ? null
    : getResourceFromSlug(state.resourceValues['pages'], slug)

  return {
    loading: state.loading.pages,
    page: page
  };
};

// actions
const mapDispatchToProps = (dispatch) => ({
  loadData: (container) => {
    console.log('call load',container)
    dispatch(loadData(container));
  }
});

// export
export default connect(mapStateToProps, mapDispatchToProps)(Page);