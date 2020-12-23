#define _CRT_SECURE_NO_WARNINGS

#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <string.h>

#define DEBUG 0

int main(void)
{
	int xx = 0;
	printf("\n请输入玄学预期（千分位）：");
	scanf("%d", &xx);
	printf("\n");

	while (1)
	{

		int count;
		printf("请输入祈愿次数：");
		scanf("%d", &count);
		int bd;
		printf("请输入距上次保底的抽数：");
		scanf("%d", &bd);


		int i;
		int n = 0;
		for (i = 0; i < count; i++)
		{
			int k = rand() % 1000;
			//printf("%d\n", rand() % 1000);
			if (k < (6 + xx) || bd == 89) {
				printf(" | 第%4d发，%s", i + 1, "金光");
				n++;
				if (bd == 89)
				{
					printf("  保底所得\n");
				}
				else
				{
					printf("\n");
				}
				bd = 0;
			}
			else
			{
				if (DEBUG)
				{
					printf(" | 第%4d发，%s\n", i + 1, "血亏16元");

				}
				bd++;
			}
		}
		printf("共计：%d发，浪费了%d元，抽到了%d个五星！据下一次保底还剩：%d发！\n\n", i, (i - n) * 16, n, 90 - bd);
	}
	return 0;
}