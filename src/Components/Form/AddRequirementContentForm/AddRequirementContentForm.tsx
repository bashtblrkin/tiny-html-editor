import React, {FC} from 'react';
import InputWithLabel from "../Controls/InputWithLabel/InputWithLabel";

const AddRequirementContentForm: FC = () => {

    return (
        <div className="req-form-wrap">
            <InputWithLabel label="№ п.п" />
        </div>
    );
};

export default AddRequirementContentForm;