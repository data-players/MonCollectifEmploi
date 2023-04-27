import { connect } from 'react-redux';

import Call from '../components/Call';

// == Data / state
const mapStateToProps = (state) => ({});

// == Actions / dispatch
const mapDispatchToProps = {};

// création du lien : container
// connect(redux)(react) - connect(ce dont on a besoin)(qui en a besoin)
const CallContainer = connect(mapStateToProps, mapDispatchToProps)(Call);

export default CallContainer;