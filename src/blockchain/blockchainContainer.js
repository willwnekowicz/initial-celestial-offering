import { connect } from 'react-redux';
import BlockchainTable from './blockchain.jsx';

const mapStateToProps = state => ({
   
});

const mapDispatchToProps = dispatch => ({
    
});

const BlockchainTableContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(BlockchainTable);

export default BlockchainTableContainer;