#define _CRT_SECURE_NO_WARNINGS

#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <string.h>

#define DEBUG 0

int main(void)
{
	int xx = 0;
	printf("\n��������ѧԤ�ڣ�ǧ��λ����");
	scanf("%d", &xx);
	printf("\n");

	while (1)
	{

		int count;
		printf("��������Ը������");
		scanf("%d", &count);
		int bd;
		printf("��������ϴα��׵ĳ�����");
		scanf("%d", &bd);


		int i;
		int n = 0;
		for (i = 0; i < count; i++)
		{
			int k = rand() % 1000;
			//printf("%d\n", rand() % 1000);
			if (k < (6 + xx) || bd == 89) {
				printf(" | ��%4d����%s", i + 1, "���");
				n++;
				if (bd == 89)
				{
					printf("  ��������\n");
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
					printf(" | ��%4d����%s\n", i + 1, "Ѫ��16Ԫ");

				}
				bd++;
			}
		}
		printf("���ƣ�%d�����˷���%dԪ���鵽��%d�����ǣ�����һ�α��׻�ʣ��%d����\n\n", i, (i - n) * 16, n, 90 - bd);
	}
	return 0;
}