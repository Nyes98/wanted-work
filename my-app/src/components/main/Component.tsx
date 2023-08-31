import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

export default function Main() {
    const [issueData, setIssueData] = useState<any>([]);
    const apiUrl = 'https://api.github.com/repos/facebook/react/issues';
    const accessToken = process.env.REACT_APP_ACCESS_TOKEN;
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    console.log('이거', accessToken);

    const callIssueData = async (page: number) => {
        try {
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `token ${accessToken}`,
                },
                params: {
                    sort: 'comments',
                    page: page,
                },
            });

            return response.data;
        } catch (error) {
            console.error('API 호출 중 오류 발생:', error);
            return null;
        }
    };

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
            setPage(page + 1);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const newData = await callIssueData(page);

            const adImageData = {
                title: '광고 이미지',
                user: {
                    login: 'advertiser',
                },
                created_at: new Date().toISOString(),
                comments: 0,
                isAd: true,
            };

            const newDataWithAds = newData.map((item: any, index: number) => {
                if ((index + 1) % 5 === 0) {
                    return adImageData;
                }
                return item;
            });

            if (newData) {
                setIssueData((prevData: any) => [...prevData, ...newDataWithAds]);
            }
            setLoading(false);
        };

        fetchData();
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [page]);

    return (
        <>
            {issueData?.map((item: any, index: number) => (
                <Card key={`card-${index}`}>
                    {item.isAd ? (
                        <img
                            onClick={() => window.open('https://www.wanted.co.kr/')}
                            src="images/ad.png"
                            alt="ad"
                        ></img>
                    ) : (
                        <StyeldLink to={`/detail/${item.number}`}>
                            <Info>
                                <Title>
                                    <div>#{item.number}</div>
                                    <div>{item.title}</div>
                                </Title>
                                <Contnents>
                                    <div>작성자: {item.user.login},</div>
                                    <div>작성일: {item.created_at.slice(0, 10)}</div>
                                </Contnents>
                            </Info>
                            <Comment>코멘트:{item.comments}</Comment>
                        </StyeldLink>
                    )}
                </Card>
            ))}
            {loading && <Loading>Loading...</Loading>}
        </>
    );
}

const StyeldLink = styled(Link)`
    text-decoration: none;
    color: black;
    display: flex;
    width: 100%;
`;

const Loading = styled.div`
    font-weight: 800;
    width: 500px;
    text-align: center;
    margin-bottom: 100px;
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
