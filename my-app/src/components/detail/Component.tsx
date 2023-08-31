import { styled } from 'styled-components';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function Detail() {
    const params = useParams();
    const apiUrl = `https://api.github.com/repos/facebook/react/issues/${params.number}`;
    const accessToken = process.env.REACT_APP_ACCESS_TOKEN;

    const [issueData, setIssueData] = useState<any>();

    const callIssueData = async () => {
        try {
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `token ${accessToken}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error('API 호출 중 오류 발생:', error);
            return null;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = await callIssueData();
            console.log('dta', data);
            setIssueData(data);
        };
        fetchData();
    }, []);

    return (
        <>
            <Wrap>
                <img src={issueData?.user.avatar_url} alt="user_avatar" />
                <Card>
                    <Info>
                        <Title>
                            <div>#{issueData?.number}</div>
                            <div>{issueData?.title}</div>
                        </Title>
                        <Contnents>
                            <div>작성자: {issueData?.user.login},</div>
                            <div>작성일: {issueData?.created_at.slice(0, 10)}</div>
                        </Contnents>
                    </Info>
                    <Comment>코멘트:{issueData?.comments}</Comment>
                </Card>
            </Wrap>
            <ReactMarkdown>{issueData?.body}</ReactMarkdown>
        </>
    );
}

const Wrap = styled.div`
    display: flex;
    align-items: center;
    img {
        width: 50px;
        height: 50px;
    }
`;

const Card = styled.div`
    border-bottom: 1px solid black;
    width: 500px;
    display: flex;

    img {
        cursor: pointer;
        width: 100px;
        margin: auto;
    }
`;

const Info = styled.div`
    width: 80%;
`;
const Comment = styled.div`
    display: flex;
    align-items: center;
`;

const Title = styled.div`
    display: flex;
    font-size: 1rem;

    div {
        margin: 10px;
    }
`;

const Contnents = styled.div`
    display: flex;
    font-size: 0.8rem;

    div {
        margin: 10px;
    }
`;

const Text = styled.div``;
