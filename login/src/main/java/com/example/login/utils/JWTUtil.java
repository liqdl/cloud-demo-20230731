package com.example.login.utils;

import java.util.Date;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.exceptions.SignatureVerificationException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;

public class JWTUtil {

    private static final String USER_INFO_KEY = "username";
    private static final String USER_ROLE_KEY = "role";

    /**
     * 生成Token
     * 
     * @param issuser         签发者
     * @param username        用户标识(唯一)
     * @param secretKey       签名算法以及密匙
     * @param tokenExpireTime 过期时间
     * @return
     */
    public static String generateToken(String username, String role, String secretKey, long tokenExpireTime) {
        Algorithm algorithm = Algorithm.HMAC256(secretKey);

        Date now = new Date();

        Date expireTime = new Date(now.getTime() + tokenExpireTime);

        String token = JWT.create()
                .withIssuedAt(now)
                .withExpiresAt(expireTime)
                .withClaim(USER_INFO_KEY, username)
                .withClaim(USER_ROLE_KEY, role)
                .sign(algorithm);

        return token;
    }

    /**
     * 校验Token
     * 
     * @param issuser   签发者
     * @param token     访问秘钥
     * @param secretKey 签名算法以及密匙
     * @return
     */
    public static void verifyToken(String token, String secretKey) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secretKey);
            JWTVerifier jwtVerifier = JWT.require(algorithm).build();
            jwtVerifier.verify(token);
        } catch (JWTDecodeException jwtDecodeException) {
            throw new TokenAuthenticationException(ResponseCodeEnum.TOKEN_INVALID.getCode(),
                    ResponseCodeEnum.TOKEN_INVALID.getMessage());
        } catch (SignatureVerificationException signatureVerificationException) {
            throw new TokenAuthenticationException(ResponseCodeEnum.TOKEN_SIGNATURE_INVALID.getCode(),
                    ResponseCodeEnum.TOKEN_SIGNATURE_INVALID.getMessage());
        } catch (TokenExpiredException tokenExpiredException) {
            throw new TokenAuthenticationException(ResponseCodeEnum.TOKEN_EXPIRED.getCode(),
                    ResponseCodeEnum.TOKEN_INVALID.getMessage());
        } catch (Exception ex) {
            throw new TokenAuthenticationException(ResponseCodeEnum.UNKNOWN_ERROR.getCode(),
                    ResponseCodeEnum.UNKNOWN_ERROR.getMessage());
        }
    }

    /**
     * 从Token中提取用户信息
     * 
     * @param token
     * @return
     */
    public static String getUserInfo(String token) {
        DecodedJWT decodedJWT = JWT.decode(token);
        String username = decodedJWT.getClaim(USER_INFO_KEY).asString();
        return username;
    }

}
