package com.example.login;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;

import java.util.concurrent.TimeUnit;

import org.junit.Ignore;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Timeout;

public class MyNumberTests {

    private MyNumber myNumber;

    @BeforeAll
    // 在所有方法执行之前执行
    public static void globalInit() {
        System.out.println("init all method...");
    }

    @AfterAll
    // 在所有方法执行之后执行
    public static void globalDestory() {
        System.out.println("destory all method...");
    }

    @BeforeEach
    // 在每个测试方法之前执行
    public void setUp() {
        System.out.println("start setUp method---");
        myNumber = new MyNumber();
    }

    @AfterEach
    // 在每个测试方法之后执行
    public void tearDown() {
        System.out.println("end tearDown method---");
    }

    @Test
    @Timeout(value = 600, unit = TimeUnit.MILLISECONDS) // 设置限定测试方法的运行时间 如果超出则返回错误
    public void testAdd() {
        System.out.println("testAdd method");
        int result = this.myNumber.add(2, 3);
        assertEquals(5, result);
    }

    @Test
    public void testSubtract() {
        System.out.println("testSubtract method");
        int result = myNumber.subtract(1, 2);
        assertEquals(-1, result);
    }

    @Test
    public void testMultiply() {
        System.out.println("testMultiply method");
        int result = myNumber.multiply(2, 3);
        assertEquals(6, result);
    }

    @Test
    public void testDivide() {
        System.out.println("testDivide method");
        int result = 0;
        try {
            result = myNumber.divide(6, 2);
        } catch (Exception e) {
            fail();
        }
        assertEquals(3, result);
    }

    @Test
    public void testDivideException() {
        System.out.println("testDivideException method");
        Assertions.assertThrows(ArithmeticException.class, () -> {
            myNumber.divide(6, 0);
        });
        // fail("test Error");
    }

    @Ignore
    public void testIgnore() {
        System.out.println("testIgnore method");
    }

    public class MyNumber {

        public int add(int a, int b) {
            return a + b;
        }

        public int subtract(int a, int b) {
            return a - b;
        }

        public int multiply(int a, int b) {
            return a * b;
        }

        public int divide(int a, int b) {
            return a / b;
        }
    }

}