package cn.itcast.gateway.filter;

import java.util.HashMap;

import java.util.Map;

import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;

import org.springframework.core.Ordered;
import org.springframework.core.io.buffer.DataBuffer;

import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;

import com.alibaba.fastjson.JSON;

import cn.itcast.gateway.utils.JWTUtil;
import cn.itcast.gateway.utils.TokenAuthenticationException;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Component
public class TokenFilter implements GlobalFilter, Ordered {
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        // 拦截请求后进行token认证
        System.out.println("There is TokenFilter GateWay");
        ServerHttpRequest request = exchange.getRequest();
        ServerHttpResponse response = exchange.getResponse();
        String method = exchange.getRequest().getMethod().name();
        System.out.println("method:" + method);

        // 获取请求url
        String url = request.getPath().toString();
        System.out.println("url:" + url);
        System.out.println("getBody:" + request.getBody());

        // 过滤请求url 即如果请求为/login/postlogin 则放行
        if (url.equals("/login/postlogin")) {
            System.out.println("url end --" + url);
            return chain.filter(exchange);
        }

        if ("POST".equals(method)) {
            System.out.println("-----------------method POST---------------------");

        } else if ("GET".equals(method)) {
            System.out.println("-----------------method GET---------------------");

        }
        // 从请求头中获取token
        String token = request.getHeaders().getFirst("token");
        System.out.println(token);

        // 如果token为空 则重写返回体
        if (null == token) {
            return getVoidMono(response);
        }

        // 如果有token 则解析token 解析成功说明token正确 则放行请求 否则重写返回体
        String secretKey = "!34ADAS";
        try {
            JWTUtil.verifyToken(token, secretKey);
        } catch (TokenAuthenticationException ex) {
            return getVoidMono(response);
        } catch (Exception ex) {
            return getVoidMono(response);
        }
        return chain.filter(exchange);
    }

    // 封装响应体 注意此处ServerHttpResponse的包为import
    // org.springframework.http.server.reactive.ServerHttpResponse
    private Mono<Void> getVoidMono(ServerHttpResponse serverHttpResponse) {
        serverHttpResponse.getHeaders().add("Content-Type", "application/json;charset=UTF-8");
        Map<String, String> entity = new HashMap<>();
        entity.put("code", "800");
        entity.put("message", "认证失败");
        DataBuffer dataBuffer = serverHttpResponse.bufferFactory().wrap(JSON.toJSONString(entity).getBytes());
        return serverHttpResponse.writeWith(Flux.just(dataBuffer));
    }

    // 设置过滤器执行顺序，值越小，优先级越高
    @Override
    public int getOrder() {
        return 0;
    }

}
