import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useCookies } from 'react-cookie';

interface Equivalency {
    id: number;
    header: string;
    value: number;
}

const IndustryEquivalencyView = () => {
    const [industryList, setList] = useState<Equivalency[]>();
    const [maxValue, setValue] = useState<number>(0);
    const [cookie] = useCookies();

    useEffect(() => {
        axios.get<Equivalency[]>(`http://3.236.213.150:8081/equiv/portfolios/all/${cookie['portfolio'].id}`).then(response => {
            setList(response.data);
        })
    }, [null]);

    useEffect(() => {
        industryList?.map(data => {
            if (data.value > maxValue) {
                setValue(data.value);
            }
        })
    })

    const renderIndustry = (industryList: Equivalency[]) => {
        return industryList.map(data => {
            return (
                <div className="col-sm m-2 fill-box justify-content-center" key={data.id}>
                    <h5 className={"tall-text p-2 ring-" + Math.round(data.value * 10 / maxValue)}>{data.value}</h5>
                    <h5>{data.header}</h5>
                </div>
            );
        });
    }

    return (
        <div className="container">
            {industryList &&
                <Card id="card-container">
                    <Card.Header id="header">
                        <h4>Industry Equivalency</h4>
                    </Card.Header>
                    <Card.Body id="industry">
                        {renderIndustry(industryList)}
                    </Card.Body>
                </Card>
            }
        </div>
    );
}

export default IndustryEquivalencyView;