package com.ma.demo.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.stereotype.Component;
import lombok.extern.slf4j.*;

@Slf4j
@Component
@Aspect
public class AOPTest {
    // 定义切入点
    @Pointcut("execution(public * com.ma.demo.controller.GetStorageController1.*(..))")
    public void aspectTest() {
    }

    // 前置通知，切入点执行之前执行
    @Before("aspectTest()")
    public void doBefore(JoinPoint joinPoint) {
        System.out.println("前置通知");
    }

    // 后置通知，切入点执行之后执行
    @After("aspectTest()")
    public void doAfter(JoinPoint joinPoint) {
        System.out.println("后置通知");
    }

    // 最终通知，，切入点执行之后执行
    @AfterReturning("aspectTest()")
    public void doAfterReturning(JoinPoint joinPoint) {
        System.out.println("最终通知");
    }

    // 异常通知，切入点抛出异常执行
    @AfterThrowing("aspectTest()")
    public void deAfterThrowing(JoinPoint joinPoint) {
        System.out.println("异常通知");
    }

    // 环绕通知，切入点执行前、后执行
    @Around("aspectTest()")
    public Object deAround(ProceedingJoinPoint joinPoint) throws Throwable {
        System.out.println("未执行");
        Object result = joinPoint.proceed();
        System.out.println("已执行");

        System.out.println("-------println--------定义切入点aspectTest");
        log.info("-------log-info-------定义切入点aspectTest");
        // 返回结果
        return result;
    }
}