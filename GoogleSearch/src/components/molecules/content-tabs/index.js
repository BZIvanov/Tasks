import { Tabs, Tab, Box } from '../../atoms';
import { useStyles } from './styles';

const ContentTabs = (props) => {
  const classes = useStyles(props);
  const { value, titles, simple } = props;

  return (
    <Box className={classes.root}>
      <Tabs
        className={classes.tabs}
        value={value}
        indicatorColor='primary'
        textColor={simple ? 'secondary' : 'primary'}
      >
        {titles.map((title) => (
          <Tab key={title} label={title} className={classes.tab} />
        ))}
      </Tabs>
    </Box>
  );
};

export default ContentTabs;
