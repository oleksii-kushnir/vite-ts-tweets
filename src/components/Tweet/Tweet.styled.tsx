import styled from 'styled-components';
import background_image from '@/assets/background_image.png';

interface FollowButtonProps {
  $isFollowing: boolean;
}

export const Container = styled.div`
  position: relative;
  width: 380px;
  height: 460px;
  box-shadow: -2.5777px 6.87386px 20.6216px rgba(0, 0, 0, 0.23);
  border-radius: 20px;
  margin-bottom: 15px;
  background: url(${background_image}) no-repeat 36px 28px / 308px 168px,
    linear-gradient(114.99deg, #471ca9 -0.99%, #5736a3 54.28%, #4b2a99 78.99%);
`;

export const Logo = styled.img`
  position: absolute;
  width: 76px;
  height: 22px;
  left: 20px;
  top: 20px;
`;

export const Stripe = styled.div`
  position: absolute;
  width: 380px;
  height: 8px;
  left: 0px;
  top: 214px;
  background: #ebd8ff;
  box-shadow: 0px 3.43693px 3.43693px rgba(0, 0, 0, 0.06),
    inset 0px -1.71846px 3.43693px #ae7be3, inset 0px 3.43693px 2.5777px #fbf8ff;
`;

export const UserImg = styled.img`
  position: absolute;
  width: 80px;
  height: 80px;
  left: 150px;
  top: 178px;
`;

export const TweetsCount = styled.p`
  margin-top: 284px;
  text-align: center;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  color: #ebd8ff;
`;

export const FollowersCount = styled.p`
  margin-top: 16px;
  text-align: center;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  color: #ebd8ff;
`;

export const FollowButton = styled.button<FollowButtonProps>`
  margin: 26px auto auto;
  display: flex;
  justify-content: center;
  padding: 14px 28px;
  width: 196px;
  height: 50px;
  background: ${(props) => (props.$isFollowing ? '#5cd3a8' : '#ebd8ff')};
  border: 0;
  border-radius: 10.3108px;
  box-shadow: 0px 3.44px 3.44px 0px #00000040;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  cursor: pointer;
`;
