import {Link} from 'react-router-dom';
import Header from './header';

const Top = () => {
  return (
    <>
        <Header />
        <Link to="Login" className="LoginButton">ログイン</Link>
        <Link to="Signin" className="LoginButton">新規登録</Link>
    </>
  );
};

export default Top;
