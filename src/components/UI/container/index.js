import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';



const useStyles = makeStyles({
    root: {
        width: "100%",
        maxWidth: "100%",
        paddingLeft: 15,
        paddingRight: 15,
        marginLeft: "auto",
        marginRight: "auto",
        boxSizing: "border-box",
        
        "@media (min-width: 768px)": {
            maxWidth: 740,
        },
    
        "@media (min-width: 992px)": {
            maxWidth: 950,
        },
    
        "@media (min-width: 1200px)": {
            maxWidth: 1200,
        },
    },
  });
  function Container(props) {
    const { ...other } = props;
    const classes = useStyles(props);
    return <Box className={classes.root} {...other} />;
  }
export default Container;