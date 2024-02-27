package com.b2012149.lv.security;

import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.b2012149.lv.service.CustomUserDetails;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;

@Component
public class JwtTokenProvider {

	private static final String SECRET_KEY = "NF@app_Dev1";
	private static final long EXPIRE_TIME = 86400000L;

	private final Logger log = LoggerFactory.getLogger(JwtTokenProvider.class);

	// need default constructor for JSON Parsing
	public JwtTokenProvider() {

	}

	public String generateTokenLogin(CustomUserDetails customUserDetails) {
		Date now = new Date();
		Date expiryDate = new Date(now.getTime() + EXPIRE_TIME);

		return Jwts.builder().setSubject((Long.toString(customUserDetails.getUser().getId()))).setIssuedAt(now)
				.setExpiration(expiryDate).signWith(SignatureAlgorithm.HS512, SECRET_KEY).compact();
	}

	public boolean validateJwtToken(String authToken) {
		try {
			Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(authToken);
			return true;
		} catch (MalformedJwtException ex) {
            log.error("Invalid JWT token");
        } catch (ExpiredJwtException ex) {
            log.error("Expired JWT token");
        } catch (UnsupportedJwtException ex) {
            log.error("Unsupported JWT token");
        }  catch (IllegalArgumentException e) {
			log.error("JWT claims string is empty -> Message: {}", e);
		}

		return false;
	}
	
	public Date getExpireToken(String token) {
		Claims claims = Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
		return claims.getExpiration();
	}

	public Long getUserIdFromJWT(String token) {
		Claims claims = Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
		return Long.parseLong(claims.getSubject());
	}
		

}
