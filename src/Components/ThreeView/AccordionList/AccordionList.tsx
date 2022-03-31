import React, {FC} from 'react';
import Typography from '@mui/material/Typography';
import {Accordion, AccordionSummary, AccordionDetails} from '../../../shared/MyAccrodionComponents';
import {ListItems} from "../../../interfaces/interfaces";

interface AccordionListProps {
    title: string
    detail: string | JSX.Element
}

const AccordionList: FC<AccordionListProps> = ({title, detail}) => {

    const [expanded, setExpanded] = React.useState(false);

    const handleChange = () => {
        setExpanded(prev => !prev)
    }

    return (
        <Accordion expanded={expanded} onChange={handleChange}>
            <AccordionSummary>
                <Typography>{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {detail}
            </AccordionDetails>
        </Accordion>
    );
};

export default AccordionList;