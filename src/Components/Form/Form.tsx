import React, {FC} from 'react';

const Form: FC = ({children}) => {
    return (
        <form>
            {children}
        </form>
    );
};

export default Form;