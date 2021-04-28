import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Transactions from './Transactions'
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        border: '1px solid lightgray',
        borderRadius: '4px',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '25%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    }
}));

export default function Block({ id, hash, nonce, difficulty, timestamp, data }) {
    console.log(data.length)
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const timestampDisplay = new Date(timestamp / 1000000).toLocaleString();

    return (
        <div className={classes.root}>
            <Accordion expanded={expanded === `panel${id}`} onChange={handleChange(`panel${id}`)}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${id}bh-content`}
                    id={`panel${id}bh-header`}
                >
                    <Typography className={classes.heading}>{hash !== "genesis_hash" ? `${hash.substring(0, 15)}...` : "genesis_hash"}</Typography>
                    <Typography className={classes.heading}>{timestampDisplay}</Typography>
                    <Typography className={classes.heading}>{nonce}</Typography>
                    <Typography className={classes.heading}>{difficulty}</Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.details}>
                    {data.map((transaction, i) => (
                        <>
                            <Transactions key={i} metadata={transaction.metadata} transaction_data={transaction.transaction_data} />
                        </>
                    ))}
                </AccordionDetails>
            </Accordion>
        </div>
    );
}